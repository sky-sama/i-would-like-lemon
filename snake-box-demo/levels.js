/* 蛇箱关卡数据。无构建步骤；浏览器 <script> 和 Node require 共享此文件。
 * map: #墙 .地 @玩家单头 B箱 X出口 *箱压出口，>^<v可指定玩家初始面向。
 * snakes: 非玩家蛇，segments 按头→尾排列，坐标从左上角(0,0)开始。
 * solution / expected 只用于提示与回归验证，不作为胜利条件。
 */
(function (root, factory) {
  const levels = factory();
  if (typeof module === 'object' && module.exports) module.exports = levels;
  else root.SnakeBoxLevels = levels;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  return [
  {
    "id": "first-steps",
    "title": "热身",
    "difficulty": "入门",
    "description": "先学会走路，再试着把箱子推开。绿色是你，靶心是出口。",
    "map": [
      "########",
      "#......#",
      "#..@.B.#",
      "#......#",
      "#.....X#",
      "########"
    ],
    "hints": [
      "能推动的箱子会先被推走。",
      "推一次箱子后，可以从下方绕向出口。"
    ],
    "solution": "RRDDR",
    "expected": {}
  },
  {
    "id": "box-door",
    "title": "推箱开路",
    "difficulty": "入门",
    "description": "中间只有一个缺口。把堵在缺口里的箱子推开，绕到右下角。",
    "map": [
      "#########",
      "#...#...#",
      "#...#...#",
      "#.@.B...#",
      "#...#...#",
      "#...#..X#",
      "#########"
    ],
    "hints": [
      "把箱子推出缺口后，不必一直推到底。",
      "站到缺口右边，向下绕过箱子。"
    ],
    "solution": "RRRDRRD",
    "expected": {
      "pushes": 2
    }
  },
  {
    "id": "first-meal",
    "title": "吞食与生长",
    "difficulty": "基础",
    "description": "把箱链顶到墙上，再推便会吞食。吃掉压在靶心上的箱子。",
    "map": [
      "############",
      "#.@..B....*#",
      "############"
    ],
    "hints": [
      "推不动时才会吃，不是见箱就吃。",
      "红温处理优先检查尾巴朝外的空位。"
    ],
    "solution": "RRRRRRRR",
    "expected": {
      "eats": 2,
      "growths": 2
    }
  },
  {
    "id": "snake-gate",
    "title": "折门换边",
    "difficulty": "进阶",
    "description": "同一条弯蛇既能蛇行，也能作为异形箱整体平移。观察头尾箭头，从不同侧面推动门蛇，清开出口走廊。",
    "map": [
      "############",
      "####....####",
      "####......X#",
      "####.......#",
      "####...#####",
      "#####.######",
      "#####.######",
      "#.@.B......#",
      "############"
    ],
    "snakes": [
      {
        "id": "gate",
        "name": "折门蛇",
        "dir": "R",
        "segments": [
          [
            6,
            3
          ],
          [
            5,
            3
          ],
          [
            5,
            4
          ],
          [
            5,
            5
          ]
        ]
      }
    ],
    "hints": [
      "先向右三步，将箱推过竖通道口；再向上三步。后两步会从尾端驱动弯蛇，头虽然朝右，尾却从下方受推。",
      "改推身体：右一步、上一步。接触不符合推尾蛇行条件，整条门蛇向上平移。",
      "换到左侧：左两步、上一步，再右两步，沿尾端方向推动拉直的门蛇。NPC 的头到出口不会替你获胜。",
      "别继续顶向墙：上一步、右一步、下一步，从上方把门蛇压到下面，再右三步到出口。",
      "主题路线全程不吞食。可以撤销比较尾端与侧面受推的区别，也允许探索其他解法。"
    ],
    "solution": "RRRUUURULLURRURDRRR",
    "expected": {
      "npcWalks": 4,
      "rigidPushes": 2,
      "pushes": 2,
      "eats": 0,
      "cuts": 0,
      "growths": 0
    },
    "verification": {
      "moves": 19,
      "finalLength": 1,
      "requiredEvents": [
        {
          "step": 5,
          "type": "npcWalks",
          "snakeId": "gate",
          "dir": "R"
        },
        {
          "step": 6,
          "type": "npcWalks",
          "snakeId": "gate",
          "dir": "R"
        },
        {
          "step": 8,
          "type": "rigidPushes",
          "snakeId": "gate",
          "dir": "U"
        },
        {
          "step": 12,
          "type": "npcWalks",
          "snakeId": "gate",
          "dir": "R"
        },
        {
          "step": 13,
          "type": "npcWalks",
          "snakeId": "gate",
          "dir": "R"
        },
        {
          "step": 16,
          "type": "rigidPushes",
          "snakeId": "gate",
          "dir": "D"
        }
      ]
    }
  },
  {
    "id": "self-cut",
    "title": "回环断尾",
    "difficulty": "进阶 · 自咬练习",
    "description": "先吃到六节，在回旋厅卷出一个小环，再咬断自己。掉下来的尾巴会成为真正能推的普通箱子。自咬是本关的主题练习，不是出口的额外条件。",
    "map": [
      "##############",
      "#..@....BBBBB#",
      "############.#",
      "########.....#",
      "########.....#",
      "#######......#",
      "#######B######",
      "#######......#",
      "#######.....X#",
      "##############"
    ],
    "hints": [
      "长大：沿上方走廊一直向右。五箱已顶住墙，推不动时就会被吃掉；到右端时蛇长为六节。",
      "入厅：从走廊右端向下四步，再向左一步。先不要急着去出口。",
      "卷环：接着按 上、左、左、下、右。头上方是自己的身体。",
      "断尾：再按一次上。身体先移位，再自咬：六节变五节，右边散落一只普通箱。向右一步把它推开。",
      "出厅：接着上一步、左三步、下两步、左一步；将门口箱向下推两格，再右五步、下一步到出口。",
      "自由实验：不卷环也能寻找其他解法。通关从不检查自咬次数，可比较更短路线。"
    ],
    "solution": "RRRRRRRRRDDDDLULLDRURULLLDDLDDRRRRRD",
    "expected": {
      "selfCuts": 1,
      "detached": 1,
      "eats": 6,
      "growths": 6,
      "pushes": 3
    },
    "verification": {
      "moves": 36,
      "finalLength": 5,
      "requiredEvents": [
        {
          "step": 20,
          "type": "selfCuts",
          "snakeId": "player",
          "x": 10,
          "y": 4,
          "detached": 1,
          "eatenId": "box:9:1"
        },
        {
          "step": 21,
          "type": "pushes",
          "boxId": "box:8:1",
          "dir": "R"
        }
      ]
    }
  },
  {
    "id": "foundry",
    "title": "双蛇换轨",
    "difficulty": "挑战",
    "description": "两条弯蛇分守不同工位。先借箱子驱动折臂蛇，再将它横移；绕到横闩蛇另一侧，选择推动或咬断。最后还要处理掉落的尾箱和出口前的箱子。",
    "map": [
      "##############",
      "#####..#######",
      "#####..#######",
      "#####..#######",
      "#@B....#######",
      "####.#########",
      "####....######",
      "######.......#",
      "#######....X.#",
      "#######....B.#",
      "#######......#",
      "##############"
    ],
    "snakes": [
      {
        "id": "elbow",
        "name": "折臂蛇",
        "dir": "U",
        "segments": [
          [
            5,
            3
          ],
          [
            5,
            4
          ],
          [
            4,
            4
          ],
          [
            3,
            4
          ]
        ]
      },
      {
        "id": "guard",
        "name": "横闩蛇",
        "dir": "R",
        "segments": [
          [
            10,
            7
          ],
          [
            9,
            7
          ],
          [
            8,
            7
          ],
          [
            8,
            8
          ],
          [
            8,
            9
          ]
        ]
      }
    ],
    "hints": [
      "箱链也能推尾：开局向右三步。前两步折臂蛇朝上蛇行；第三步接触方向已不同，整条蛇向右平移。",
      "换工位：接着下两步、右三步、下四步、右一步，绕到横闩蛇尾巴下方。不要只从左边硬推。",
      "推尾再换侧：向上两步使它沿头方向向右蛇行。再右、上，从侧面推被上墙卡住的身体：咬断并掉落一节尾箱。",
      "散落物可推：向左两步把断尾箱推到空位，再下三步、右四步，绕到出口箱下方。",
      "最后向上两步：先把箱推到出口，下一步它被上方蛇身和墙挡住，推不动就吃掉。",
      "提示是一条验证过的主题路线，不是操作锁；也可以自由尝试其他解法。"
    ],
    "solution": "RRRDDRRRDDDDRUURULLDDDRRRRUU",
    "expected": {
      "npcWalks": 4,
      "rigidPushes": 1,
      "pushes": 6,
      "cuts": 1,
      "detached": 1,
      "eats": 2,
      "growths": 2
    },
    "verification": {
      "moves": 28,
      "finalLength": 3,
      "requiredEvents": [
        {
          "step": 1,
          "type": "npcWalks",
          "snakeId": "elbow",
          "dir": "U"
        },
        {
          "step": 2,
          "type": "npcWalks",
          "snakeId": "elbow",
          "dir": "U"
        },
        {
          "step": 3,
          "type": "rigidPushes",
          "snakeId": "elbow",
          "dir": "R"
        },
        {
          "step": 14,
          "type": "npcWalks",
          "snakeId": "guard",
          "dir": "R"
        },
        {
          "step": 15,
          "type": "npcWalks",
          "snakeId": "guard",
          "dir": "R"
        },
        {
          "step": 17,
          "type": "cuts",
          "snakeId": "guard",
          "eaterId": "player",
          "detached": 1
        },
        {
          "step": 18,
          "type": "pushes",
          "boxId": "guard:4",
          "dir": "L"
        },
        {
          "step": 19,
          "type": "pushes",
          "boxId": "guard:4",
          "dir": "L"
        },
        {
          "step": 27,
          "type": "pushes",
          "boxId": "box:11:9",
          "dir": "U"
        },
        {
          "step": 28,
          "type": "eats",
          "snakeId": "player",
          "boxId": "box:11:9"
        }
      ]
    }
  },
  {
    "id": "thermal-relay",
    "title": "热炉接力",
    "difficulty": "高阶 · 双蛇热交换",
    "description": "狭小的热炉里，两条蛇既是闩锁也是传动臂。先喂食抬升，再换侧推尾；被切下的尾箱还要送给另一条蛇，改变它的行进方向。出口始终只检查你的蛇头。",
    "map": [
      "#######",
      "##....#",
      "##....#",
      "#@BB.##",
      "##....#",
      "##..#.#",
      "##....#",
      "#X...##",
      "#######"
    ],
    "snakes": [
      {
        "id": "lift",
        "name": "升降臂",
        "dir": "R",
        "segments": [
          [
            4,
            3
          ],
          [
            4,
            4
          ]
        ]
      },
      {
        "id": "relay",
        "name": "接力闩",
        "dir": "D",
        "segments": [
          [
            2,
            7
          ],
          [
            2,
            6
          ],
          [
            2,
            5
          ],
          [
            2,
            4
          ]
        ]
      }
    ],
    "hints": [
      "先右两步。第一步箱链把前箱喂给升降臂：它因右墙不能整体移动，尾后又是墙，反推向上完成生长。第二步你吃掉余箱。",
      "换到臂头右侧：上、上、右、右、下、左。将升降臂整体向左平移，露出右边通道；接力闩暂时仍在下方守门。",
      "从下方推升降臂的尾：下、下、右、下、下、左、左、上、上。推入方向向上，但升降臂沿自己的头向左蛇行。",
      "再右、上、上、左。从侧面咬断卡墙的升降臂，旧尾在下方变成普通箱。不要直接吃掉这个掉落物。",
      "把尾箱向下推四次，再右、下、左：尾箱被喂给接力闩。它转向右并生长，长出的尾部到达上方接力位置。",
      "沿中列向上六次，左、下。推动剩下的升降臂头，间接从尾端驱动接力闩；这次它沿新头向右走。",
      "最后右、下四次、左、下、左：咬开接力闩身体，再吃掉出口前那节，进左侧出口。攻略是一条丰富机制路线，不是额外胜利条件。"
    ],
    "solution": "RRUURRDLDDRDDLLUURUULDDDDRDLUUUUUULDRDDDDLDL",
    "expected": {
      "pushes": 5,
      "rigidPushes": 3,
      "npcWalks": 2,
      "eats": 6,
      "cuts": 3,
      "selfCuts": 0,
      "detached": 3,
      "growths": 6,
      "reverseGrowths": 1,
      "headTurns": 0
    },
    "verification": {
      "moves": 44,
      "finalLength": 5,
      "requiredEvents": [
        {
          "step": 1,
          "type": "eats",
          "snakeId": "lift",
          "boxId": "box:3:3"
        },
        {
          "step": 1,
          "type": "growths",
          "snakeId": "lift",
          "end": "tail",
          "dir": "D",
          "rank": 3,
          "mode": "reverse",
          "boxId": "box:3:3"
        },
        {
          "step": 8,
          "type": "rigidPushes",
          "snakeId": "lift",
          "dir": "L"
        },
        {
          "step": 17,
          "type": "npcWalks",
          "snakeId": "lift",
          "dir": "L"
        },
        {
          "step": 21,
          "type": "cuts",
          "snakeId": "lift",
          "eaterId": "player",
          "detached": 1
        },
        {
          "step": 22,
          "type": "pushes",
          "boxId": "lift:1",
          "dir": "D"
        },
        {
          "step": 25,
          "type": "pushes",
          "boxId": "lift:1",
          "dir": "D"
        },
        {
          "step": 28,
          "type": "eats",
          "snakeId": "relay",
          "boxId": "lift:1"
        },
        {
          "step": 28,
          "type": "growths",
          "snakeId": "relay",
          "end": "tail",
          "dir": "U",
          "rank": 1,
          "mode": "empty",
          "boxId": "lift:1"
        },
        {
          "step": 36,
          "type": "npcWalks",
          "snakeId": "relay",
          "dir": "R"
        },
        {
          "step": 36,
          "type": "rigidPushes",
          "snakeId": "lift",
          "dir": "D"
        },
        {
          "step": 42,
          "type": "cuts",
          "snakeId": "relay",
          "eaterId": "player",
          "detached": 2
        },
        {
          "step": 43,
          "type": "eats",
          "snakeId": "player",
          "boxId": "lift:1"
        }
      ],
      "mechanismChecks": [
        "npcEat",
        "pushBox",
        "rigidPush",
        "npcGrowth",
        "reverseGrowth",
        "boxChain",
        "playerEat",
        "tailWalk",
        "bentTailWalk",
        "otherCut",
        "detachedBoxPush",
        "detachedBoxEat",
        "multipleNpcs",
        "snakeRelay"
      ]
    },
    "mechanics": [
      "箱链传力",
      "NPC被喂食与独立红温",
      "反推尾端生长",
      "异形整体推动",
      "弯蛇推尾与非平行头向",
      "多蛇级联传力",
      "咬断与身体掉落",
      "掉落箱复用为另一NPC食物",
      "NPC吞食转向后蛇行",
      "玩家生长与狭窄站位"
    ]
  },
  {
    "id": "closed-loop-furnace",
    "title": "闭环熔炉",
    "difficulty": "压轴 · 闭环机关",
    "description": "狭窄的闭环让头、尾和散落箱互相卡位。先让炉臂吞食抬升，剥下闩蛇的身体为自己增重；再反复换位、自咬，将掉落物送回闩蛇。不要只求吃穿：自己的身体也在决定NPC能否生长。",
    "map": [
      "#########",
      "#X###v###",
      "#....B..#",
      "#..##B..#",
      "#.##...##",
      "##...#..#",
      "#########"
    ],
    "snakes": [
      {
        "id": "crucible",
        "name": "炉臂",
        "dir": "D",
        "segments": [
          [
            5,
            4
          ],
          [
            4,
            4
          ]
        ]
      },
      {
        "id": "bolt",
        "name": "闩蛇",
        "dir": "L",
        "segments": [
          [
            1,
            2
          ],
          [
            2,
            2
          ],
          [
            3,
            2
          ],
          [
            4,
            2
          ]
        ]
      }
    ],
    "solution": "DLLLDLURRRRRRDLULDDRURULLDRDLURULLLLLDLURRRRDLULLLLU",
    "hints": [
      "先观察左上出口：能吃的是身体，不能吃的是蛇头。不要把第一轮接近出口当成终点；闩蛇还会在之后拿回身体。",
      "开局向下一次，将前箱喂给炉臂；它会向右反推生长。接着左三次、下、左、上，吃下闩蛇的三节身体，并把剩下的头暂时推到出口。此时长四节，还不能直接过关。",
      "返回右侧取料：右六次、下、左、上、左、下、下。末两步会吃箱、切断炉臂，增长时还会把剩下的炉臂头顶到下面；你会长到六节。",
      "关键是右侧小回环：按 右、上、右、上、左、左、下、右、下、左、上、右。最后两步连续自咬；第一次掉出尾箱，第二次头端生长多走一格。不要把落在上方通道的箱吃掉。",
      "把刚掉落的箱送回左侧闩蛇：上、左五次、下、左、上。闩蛇吞食后会保持红温，因为你的身体还堵着它；此时再向右一次自咬，给它反推生长的空间。一次按键会触发玩家与NPC的多段连锁。",
      "连锁结束后玩家缩到两节，但不要掉头。右三次、下、左、上、左四次、上：绕回左端，咬开新长出的闩蛇身体，吃掉出口上的箱子。",
      "完整示范是一条经过广度搜索验证的52步最短解。困难来自正常推动/生长规则的空间约束，没有额外机制计数锁。"
    ],
    "mechanics": [
      "必须自咬解围",
      "双蛇参与",
      "箱链喂食NPC",
      "反推自己生长",
      "异形整体推动",
      "咬断身体与尾箱回收",
      "侧向/头端生长",
      "生长推动NPC",
      "红温跨回合保留",
      "NPC返咬玩家",
      "多头同轮连锁"
    ],
    "expected": {
      "pushes": 6,
      "rigidPushes": 5,
      "npcWalks": 0,
      "eats": 13,
      "cuts": 9,
      "selfCuts": 3,
      "detached": 5,
      "growths": 13,
      "reverseGrowths": 3,
      "headTurns": 0
    },
    "verification": {
      "moves": 52,
      "finalLength": 4,
      "requiredEvents": [
        {
          "step": 1,
          "type": "eats",
          "snakeId": "crucible",
          "boxId": "box:5:3",
          "x": 5,
          "y": 3
        },
        {
          "step": 1,
          "type": "rigidPushes",
          "snakeId": "crucible",
          "dir": "R"
        },
        {
          "step": 1,
          "type": "growths",
          "snakeId": "crucible",
          "end": "tail",
          "dir": "L",
          "rank": 3,
          "mode": "reverse",
          "boxId": "box:5:3"
        },
        {
          "step": 1,
          "type": "reverseGrowths",
          "snakeId": "crucible"
        },
        {
          "step": 7,
          "type": "rigidPushes",
          "snakeId": "bolt",
          "dir": "U"
        },
        {
          "step": 18,
          "type": "eats",
          "snakeId": "player",
          "boxId": "box:5:2",
          "x": 5,
          "y": 3
        },
        {
          "step": 18,
          "type": "growths",
          "snakeId": "player",
          "end": "tail",
          "dir": "R",
          "rank": 4,
          "mode": "empty",
          "boxId": "box:5:2"
        },
        {
          "step": 19,
          "type": "cuts",
          "snakeId": "crucible",
          "eaterId": "player",
          "x": 5,
          "y": 4,
          "detached": 1
        },
        {
          "step": 19,
          "type": "eats",
          "snakeId": "player",
          "boxId": "box:5:3",
          "x": 5,
          "y": 4
        },
        {
          "step": 19,
          "type": "rigidPushes",
          "snakeId": "crucible",
          "dir": "D"
        },
        {
          "step": 19,
          "type": "growths",
          "snakeId": "player",
          "end": "tail",
          "dir": "D",
          "rank": 3,
          "mode": "direct",
          "boxId": "box:5:3"
        },
        {
          "step": 30,
          "type": "cuts",
          "snakeId": "player",
          "eaterId": "player",
          "x": 5,
          "y": 3,
          "detached": 1
        },
        {
          "step": 30,
          "type": "selfCuts",
          "snakeId": "player",
          "x": 5,
          "y": 3,
          "detached": 1,
          "eatenId": "bolt:2"
        },
        {
          "step": 30,
          "type": "eats",
          "snakeId": "player",
          "boxId": "bolt:2",
          "x": 5,
          "y": 3
        },
        {
          "step": 30,
          "type": "growths",
          "snakeId": "player",
          "end": "tail",
          "dir": "U",
          "rank": 1,
          "mode": "empty",
          "boxId": "bolt:2"
        },
        {
          "step": 31,
          "type": "cuts",
          "snakeId": "player",
          "eaterId": "player",
          "x": 6,
          "y": 3,
          "detached": 0
        },
        {
          "step": 31,
          "type": "selfCuts",
          "snakeId": "player",
          "x": 6,
          "y": 3,
          "detached": 0,
          "eatenId": "bolt:1"
        },
        {
          "step": 31,
          "type": "eats",
          "snakeId": "player",
          "boxId": "bolt:1",
          "x": 6,
          "y": 3
        },
        {
          "step": 31,
          "type": "growths",
          "snakeId": "player",
          "end": "head",
          "dir": "R",
          "rank": 2,
          "mode": "empty",
          "boxId": "bolt:1"
        },
        {
          "step": 40,
          "type": "eats",
          "snakeId": "bolt",
          "boxId": "bolt:3",
          "x": 1,
          "y": 2
        },
        {
          "step": 41,
          "type": "cuts",
          "snakeId": "player",
          "eaterId": "player",
          "x": 2,
          "y": 2,
          "detached": 0
        },
        {
          "step": 41,
          "type": "selfCuts",
          "snakeId": "player",
          "x": 2,
          "y": 2,
          "detached": 0,
          "eatenId": "box:5:2"
        },
        {
          "step": 41,
          "type": "eats",
          "snakeId": "player",
          "boxId": "box:5:2",
          "x": 2,
          "y": 2
        },
        {
          "step": 41,
          "type": "cuts",
          "snakeId": "player",
          "eaterId": "bolt",
          "x": 1,
          "y": 2,
          "detached": 2
        },
        {
          "step": 41,
          "type": "eats",
          "snakeId": "bolt",
          "boxId": "bolt:1",
          "x": 1,
          "y": 2
        },
        {
          "step": 41,
          "type": "rigidPushes",
          "snakeId": "bolt",
          "dir": "D"
        },
        {
          "step": 41,
          "type": "growths",
          "snakeId": "bolt",
          "end": "tail",
          "dir": "U",
          "rank": 3,
          "mode": "reverse",
          "boxId": "bolt:3"
        },
        {
          "step": 41,
          "type": "reverseGrowths",
          "snakeId": "bolt"
        },
        {
          "step": 41,
          "type": "growths",
          "snakeId": "player",
          "end": "head",
          "dir": "R",
          "rank": 2,
          "mode": "empty",
          "boxId": "box:5:2"
        },
        {
          "step": 41,
          "type": "rigidPushes",
          "snakeId": "bolt",
          "dir": "D"
        },
        {
          "step": 41,
          "type": "growths",
          "snakeId": "bolt",
          "end": "tail",
          "dir": "U",
          "rank": 3,
          "mode": "reverse",
          "boxId": "bolt:1"
        },
        {
          "step": 41,
          "type": "reverseGrowths",
          "snakeId": "bolt"
        },
        {
          "step": 51,
          "type": "cuts",
          "snakeId": "bolt",
          "eaterId": "player",
          "x": 1,
          "y": 2,
          "detached": 1
        },
        {
          "step": 51,
          "type": "eats",
          "snakeId": "player",
          "boxId": "bolt:1",
          "x": 1,
          "y": 2
        },
        {
          "step": 51,
          "type": "growths",
          "snakeId": "player",
          "end": "tail",
          "dir": "R",
          "rank": 1,
          "mode": "empty",
          "boxId": "bolt:1"
        },
        {
          "step": 52,
          "type": "eats",
          "snakeId": "player",
          "boxId": "bolt:3",
          "x": 1,
          "y": 1
        },
        {
          "step": 52,
          "type": "growths",
          "snakeId": "player",
          "end": "tail",
          "dir": "R",
          "rank": 1,
          "mode": "empty",
          "boxId": "bolt:3"
        }
      ],
      "mechanismChecks": [
        "npcEat",
        "pushBox",
        "rigidPush",
        "npcGrowth",
        "reverseGrowth",
        "boxChain",
        "otherCut",
        "playerEat",
        "multipleNpcs",
        "vacatedTail",
        "sideGrowth",
        "directGrowth",
        "selfCut",
        "headGrowth",
        "detachedBoxPush",
        "detachedBoxEat",
        "heatCarry",
        "multipleHeadsGrow",
        "heatCascade"
      ],
      "requiredStates": [
        {
          "step": 4,
          "playerLength": 4
        },
        {
          "step": 19,
          "playerLength": 6
        },
        {
          "step": 30,
          "playerLength": 5,
          "entityOwners": {
            "bolt:3": "box"
          }
        },
        {
          "step": 40,
          "playerLength": 5,
          "heatCount": 1,
          "headDirs": {
            "bolt": "D"
          },
          "entityOwners": {
            "bolt:3": "heat:bolt"
          }
        },
        {
          "step": 41,
          "playerLength": 2,
          "heatCount": 0,
          "npcLengths": {
            "bolt": 3
          },
          "entityOwners": {
            "bolt:3": "bolt"
          }
        },
        {
          "step": 52,
          "playerLength": 4,
          "heatCount": 0
        }
      ],
      "difficulty": {
        "method": "BFS over unchanged E.step, including changed-but-not-moved head turns",
        "shortestMoves": 52,
        "mechanicsWithoutSolutions": [
          "selfCut",
          "reverse",
          "npcEat",
          "rigid",
          "cut",
          "freeze:crucible",
          "freeze:bolt"
        ],
        "identityPreservingConfirmation": {
          "expanded": 170172,
          "states": 195698,
          "shortestMoves": 52
        },
        "noSelfCutIdentityStates": 598,
        "noRuntimeGate": true,
        "note": "离线搜索只过滤对应机制的动作，不修改游戏规则；exhausted表示可达状态已遍历完。未主张所有显示标签均为每条解必需，也不主张唯一最短解。"
      }
    }
  }
];
});
