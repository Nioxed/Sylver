class guildSettings{

    constructor(){

        // Modify the values below :)
        this.name = "guildSettings"
        this.description = "Allow different configs for every guild."
        this.version = "1.0.0"

    }

    init(){

        client.guilds.each( guild =>{

            let guildConfig = new StorageManager(client, 'guildConfig-' + guild.id, false, false)
            guildConfig.once('newFile', (ready)=> {

                guildConfig.register('prefix', 's!');
                guildConfig.save();
        
                client.log('Config generated for ' + guild.name);
                ready();
        
            })

        })

    }

    postInit(){



    }


}

module.exports = guildSettings;