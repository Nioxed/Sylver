class Command {

    constructor(trigger, permission){

        

    }


}


class CommandManager {

    constructor(){

        this.parser = require('discord-command-parser')
        this.commands = {};

    }

    parse(client, messageContent){

        return parser.parse(message, prefix);

    }

    registerCommand(addon, trigger, options){

        

    }


}

module.exports = {
    command: Command,
    manager: CommandManager
};