/**
 * Clase padre  de Character, EndScreen, GameInfo, InformationScreen  y StartScreen
 */

class ScreenItem {
    
    constructor(domNode){
        this.setDomNode(domNode);
    };

    /**
     * Setea el nodo del DOM con el nuevo valor
     * @param {} domNode 
     */

    setDomNode(domNode){
        this.domNode = domNode;
    }

    //Retorna el valor del nodo del DOM
    getNode(){
        return this.domNode;
    }

    /**
     * Retorna  los valores del objeto DOMRect el cual provee la posición relativa del elemento con respecto a la vista.
     *  ordenada x (horizontal) y ordenada y (vertical)
    */
    getPosition(){ 
        let rect = this.domNode.getBoundingClientRect();
        return {x: rect.x, y: rect.y}; 
    }

    /**
     * @returns Retorna  los valores del objeto DOMRect el cual provee el tamaño del rectángulo 
     * Ancho y alto
     */
    getSize() {
        let rect = this.domNode.getBoundingClientRect();
        return {width: rect.width, height: rect.height}; 
    }

    /**
     * Oculta el elemento de la pantalla agregando la clase css .hidden
     */
    hide(){
        this.domNode.classList.add('hidden');
    }

    /**
     * muestra elemento en la pantalla quitando la clase de css .hidden
     */
    show(){
        this.domNode.classList.remove('hidden');
    }
    

}
