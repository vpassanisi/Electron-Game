import { TileTemplate } from "../../types";
import Wall from './Wall'

const Room: TileTemplate[][] = [
[{model:{class:Wall,type:"topLeft"}}, {model:{class:Wall,type:"top"}}, {model:{class:Wall,type:"top"}}, {model:{class:Wall,type:"top"}}, {model:{class:Wall,type:"top"}}, {model:{class:Wall,type:"top"}}, {model:{class:Wall,type:"top"}}, {model:{class:Wall,type:"top"}}, {model:{class:Wall,type:"top"}}, {model:{class:Wall,type:"top"}}, {model:{class:Wall,type:"top"}}, {model:{class:Wall,type:"top"}}, {model:{class:Wall,type:"top"}}, {model:{class:Wall,type:"top"}}, {model:{class:Wall,type:"topRight"}}],
[{model:{class:Wall,type:"left"}}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {model:{class:Wall,type:"right"}}],
[{model:{class:Wall,type:"left"}}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {model:{class:Wall,type:"right"}}],
[{model:{class:Wall,type:"left"}}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {model:{class:Wall,type:"right"}}],
[{model:{class:Wall,type:"left"}}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {model:{class:Wall,type:"right"}}],
[{model:{class:Wall,type:"left"}}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {model:{class:Wall,type:"right"}}],
[{model:{class:Wall,type:"left"}}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {model:{class:Wall,type:"right"}}],
[{model:{class:Wall,type:"left"}}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {model:{class:Wall,type:"right"}}],
[{model:{class:Wall,type:"bottomLeft"}}, {model:{class:Wall,type:"bottom"}}, {model:{class:Wall,type:"bottom"}}, {model:{class:Wall,type:"bottom"}}, {model:{class:Wall,type:"bottom"}}, {model:{class:Wall,type:"bottom"}}, {model:{class:Wall,type:"bottom"}}, {model:{class:Wall,type:"bottom"}}, {model:{class:Wall,type:"bottom"}}, {model:{class:Wall,type:"bottom"}}, {model:{class:Wall,type:"bottom"}}, {model:{class:Wall,type:"bottom"}}, {model:{class:Wall,type:"bottom"}}, {model:{class:Wall,type:"bottom"}}, {model:{class:Wall,type:"bottomRight"}}],
]

export {Room}
