
    /*      Sylver Framework 0.0.1
            BeepSterr 2019              */

    moment                  = require('moment');
    caller 		            = require('caller');
    colors 		            = require('colors');

    const Sylver            = require('./system/main.js')
    StorageManager          = require('./system/storageManager.js')
    const Dashboard         = require('./system/dashboard.js')

    client              = new Sylver({ shardCount: "auto" });
    config              = new StorageManager(client, 'config', true, false)
    dashboard           = []
    
    client.log('Sylver is starting...')
    let initHold = client.createHold();

    // Let's import our object storage.
    config.once('ready', ()=> {

        // We'll need to initialize the dashboard now.
        client.login(config.get('bot_token'));
        client.resolveHold(initHold);

    })

    // The config storage file was just made, We'll need to populate before erroring out.
    config.once('newFile', ()=> {

        config.register('bot_token', '');
        config.register('dashboard_port', 3000);
        config.register('log_debug', false);

        config.save();

        client.error('Config has been generated, Please fill it in and restart.');
        client.resolveHold(initHold);

        client.shutdown();

    })

    client.on('ready', ()=> {	

        dashboard = new Dashboard(client);

        client.log( 'Sylver booted up as ' + client.user.username )
        require('fs').readdirSync(__dirname + '/instance/').forEach(function(file) {
            client.debug('Loading ' + file);
            require('/instance/' + file)();
        });

        client.guilds.each( guild =>{

            
            guildConfig = new StorageManager(client, 'guildConfig-' + guild.id, false, false)
            guildConfig.once('newFile', (ready)=> {

                guildConfig.register('prefix', 's!');
                guildConfig.save();
        
                client.log('Config generated for ' + guild.name);
                ready();
        
            })

        })

    })