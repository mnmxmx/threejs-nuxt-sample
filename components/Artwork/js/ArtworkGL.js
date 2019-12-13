import Common from "./Common";
import Shape from "./Shape"

export default class ArtworkGL{
    constructor(props){
        this.props = props;
        this.init();
    }

    init(){
        Common.init(this.props.$canvas);
        this.shape = new Shape();
        window.addEventListener("resize", this.resize.bind(this));
        this.loop();
    }

    resize(){
        Common.resize();
    }

    loop(){
        this.render();
        requestAnimationFrame(this.loop.bind(this));
    }

    render(){
        this.shape.update();
        Common.render();
    }

}