# -*- coding: utf-8 -*-
"""蛇箱 Demo 快速部署脚本：启动本地 HTTP 服务并自动打开游戏页面。
用法：
    python deploy.py              # 自动选空闲端口，起服务并打开浏览器
    python deploy.py --port 8000  # 指定端口
    python deploy.py --no-browser # 只起服务不打开浏览器
按 Ctrl+C 停止服务。
"""
import argparse
import functools
import http.server
import socket
import sys
import threading
import webbrowser
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
PAGE = "snake-box-demo.html"

# Windows GBK 控制台无法输出 emoji/中文时，改为 UTF-8（失败则替换字符，不影响服务）
try:
    if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass


def find_free_port(preferred: int | None) -> int:
    if preferred:
        return preferred
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def main() -> None:
    parser = argparse.ArgumentParser(description="蛇箱 Demo 本地部署")
    parser.add_argument("--port", type=int, default=None, help="指定端口（默认自动选空闲端口）")
    parser.add_argument("--no-browser", action="store_true", help="不自动打开浏览器")
    args = parser.parse_args()

    if not (BASE_DIR / PAGE).exists():
        sys.exit(f"错误：未找到 {BASE_DIR / PAGE}")

    port = find_free_port(args.port)
    url = f"http://127.0.0.1:{port}/{PAGE}"

    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(BASE_DIR))
    server = http.server.ThreadingHTTPServer(("127.0.0.1", port), handler)

    if not args.no_browser:
        threading.Timer(0.4, lambda: webbrowser.open(url)).start()

    print(f"🐍📦 蛇箱 Demo 已部署：{url}")
    print("按 Ctrl+C 停止服务")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n已停止。")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
