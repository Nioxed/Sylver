class SylverAddon{

    /* 
    
        TODO: Write info

    */

    constructor(){

        // Modify the values below :)
        this.name = "exampleAddon"
        this.description = "Template & Example for your own addons!"
        this.version = "1.0.0"

    }

    init(){

        client.log('My Epic Addon loaded!')

    }

    postInit(){



    }


}

module.exports = SylverAddon;