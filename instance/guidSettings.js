class guildSettings{

    constructor(){

        // Modify the values below :)
        this.name = "guildSettings"
        this.description = "Allow different configs for every guild."
        this.version = "1.1.0"

        this.configs = {};

    }

    init(){

    }

    postInit(){

    }

    getGuildConfig(guild, ret){

        let guildConfig = new StorageManager(client, 'guilds/' + guild, false, false)

        guildConfig.once('newFile', (ready)=> { ready(); })
        guildConfig.once('ready', ()=> {

            // lets go!
            guildConfig.register('prefix', '.');
            guildConfig.save();

            ret(guildConfig)
        
        })

    }


}

module.exports = guildSettings;