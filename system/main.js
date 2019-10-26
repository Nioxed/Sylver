const Discord           = require('discord.js')
const CommandManager    = require('./commands.js')

class Sylver extends Discord.Client {


    constructor(){

        super();
        
        this.debug('Sylver class initialized')

        // ID Generator
        this.uuid = require('uuid/v4');
        this.exiting = false;

        this.dataStorageDefaults = {

            guilds: [],
            users: [],

        }

        // Trigger the hold system when the process is being F'd
        this.holds = [];
        let obj = this;

        process.on('SIGINT', function() { obj.shutdown(); });
        process.on('EXIT', function() { obj.shutdown(); });

        this.debug('Hold system registered')
        this.emit('SylverInitialized');

    }

    /*
        Logging Module
    */

   debug(message) {

        const time = moment().format('hh:mm:ss');
        const type = 'DEBUG';
        const origin = caller();

        const mes = time.cyan + ' ' + type.cyan + ' ' +  origin.gray + ' ' + message.cyan
        console.log(mes);

    };

    log(message) {

        const time = moment().format('hh:mm:ss');
        const type = 'NOTICE';
        const origin = caller();

        const mes = time.cyan + ' ' + type.white + ' ' +  origin.gray + ' ' + message.white
        console.log(mes);


    };

    warn(message) {

        const time = moment().format('hh:mm:ss');
        const type = 'WARN';
        const origin = caller();

        const mes = time.cyan + ' ' + type.yellow + ' ' +  origin.gray + ' ' + message.yellow
        console.log(mes);


    };

    error(message) {

        const time = moment().format('hh:mm:ss');
        const type = 'ERROR';
        const origin = caller();

        const mes = time.cyan + ' ' + type.red + ' ' +  origin.gray + ' ' + message.red
        console.log(mes);


    };

    shutdown(){

        // Cancel exit.
        process.stdin.resume();
        this.exiting = true;

        if(Object.keys(this.holds).length != 0){
                
            this.log('Waiting for Sylver to finish up before exiting... ( ' + Object.keys(this.holds).length + ' holds left )');
            console.log(this.holds)
            setTimeout( ()=> {

                // Try to exit again.
                this.shutdown();

            },1000);

        }else{

            // Allow Exit.
            process.exit();

        }

    }

    createHold(){

        /*

            Using this will make sure that the process doesn't exit if you're doing something important.
            Don't forget to release holds, Or the application will be stuck indefinetly.

            Usage Guide:

                let hold = client.createHold();
                // code to run
                client.resolveHold(hold);

        */

       let hold = { 
            id: this.uuid(),
            origin: caller()
        }

        this.holds[hold.id] = hold.origin;
        return hold;

    }

    resolveHold(hold){

        delete this.holds[hold.id];

    }

    /*

        Guild & User data storage

    */

    registerGuildData( key, value){
        this.dataStorageDefaults.guilds.push({key: key, value: value});
    }
    
    registerUserData( key, value){
        this.dataStorageDefaults.users.push({key: key, value: value});
    }  
     
    getGuildData( guildResolvable, callback ){

        let client = this;
        let guild = this.guilds.resolve(guildResolvable);

        if(guild === undefined){ 
            this.warn('Coud not resolve guild ' + guildResolvable);
            callback(null);
            return;
        }

        let guildData = new StorageManager(client, 'guilds/' + guild.id, false, false)

        guildData.once('newFile', (ready)=> {

                guildData.save();
        
                client.log('guildData generated for ' + guild.name);
                ready();
        
            })

            guildData.once('ready', ()=> {

                client.dataStorageDefaults.guilds.forEach( dataVar => {
                    guildData.register(dataVar.key, dataVar.value);
                })
        
                callback(guildData)
        
            })

    }  

    getUserData( userResolvable, callback ){

        let client = this;
        let user = this.users.resolve(userResolvable);

        if(user === undefined){ 
            this.warn('Coud not resolve user ' + userResolvable);
            callback(null);
            return;
        }

        let userData = new StorageManager(client, 'users/' + guild.id, false, false)

        userData.once('newFile', (ready)=> {

                userData.save();
        
                client.log('userData generated for ' + guild.name);
                ready();
        
            })

            userData.once('ready', ()=> {

                client.dataStorageDefaults.users.forEach( dataVar => {
                    guildData.register(dataVar.key, dataVar.value);
                })

                callback(userData);
        
            })

    }


}

module.exports = Sylver;