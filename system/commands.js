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

        const parsed = parser.parse(message, prefix);

    }


}

module.exports = {
    command: Command,
    manager: CommandManager
};