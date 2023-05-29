class ScreenItem {
    
    constructor(domNode){
        this.setDomNode(domNode);
    };


    setDomNode(domNode){
        this.domNode = domNode;
    }

    getPosition(){ 
        let rect = this.domNode.getBoundingClientRect();
        return {x: rect.x, y: rect.y}; 
    }

    getSize() {
        let rect = this.domNode.getBoundingClientRect();
        return {width: rect.width, height: rect.height}; 
    }

    getNode(){
        return this.domNode;
    }

    hide(){
        this.domNode.classList.add('hidden');
    }

    show(){
        this.domNode.classList.remove('hidden');
    }
    

}
