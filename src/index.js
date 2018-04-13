const fastify = require('fastify')();
const spawn = require('child_process').spawnSync;

fastify.register(require('fastify-formbody'))

require('dotenv').config();

fastify.get('*', async function (req, res) {
    if (req.headers && req.headers['user-agent'] && !req.headers['user-agent'].includes('curl')) {
        res.type('Content-Type: text/html; charset=utf-8');
        return `Use your terminal, not your browser silly ლ(ಠ益ಠლ)
https://github.com/ponydevs/ponysay.ml`
    } else {
        return `Ponysay.ml is work just fine (づ￣ ³￣)づ go have some fun will ya?
Oh by the way, don't forogt to put the -X POST at the Curl command (¬‿¬)`;
    }
});

fastify.post('/', async (req, res) => {
    if (req.headers && req.headers['user-agent'] && !req.headers['user-agent'].includes('curl')) {
        return {
            question: 'Are you using Postman or something like that lol',
            message: 'Go, have some fun with your Curl command and the Terminal will ya?',
            github: 'https://github.com/ponydevs/ponysay.ml',

        }
    } else {
        // Is a Curl command
        if (req.body && !req.body.say || !req.body) {
            return `You didn\'t say anything at all ლ(ಠ益ಠლ)
Example Command: curl -X POST -d 'say=I love ponies' http://ponysay.ml`;
        }
        // Ready to call the Ponysay command
        let trying = true;
        let output = "";
        const _arguments = [
            req.body.say,
        ];

        if(req.body.pony){
            _arguments.push('--pony');
            _arguments.push(req.body.pony);
        }

        try {
            while(trying){
                const ponysayProcess = spawn('ponysay', _arguments);
                if(ponysayProcess.output.toString().includes(req.body.say)){
                    trying = false;
                    output = ponysayProcess.output.toString();
                }
            }
            res.header('X-Said', req.body.say);
            return output;
        } catch (error) {
            return `Opps, something when wrong while calling the ponysay command ( ⚆ _ ⚆ )
Error: ${error}
If you can, please take a screenshot and fire an issue at the GitHub repo, thanks ( ﾟヮﾟ)`;
        }
    }
});

/*
This application should be running inside a Docker container
So the hsot should be 0.0.0.0
*/

fastify.listen(3000, '0.0.0.0', function (err) {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)
});