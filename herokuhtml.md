### Summary of Steps to deploy Node and Mongo
<table>
    <tr>
        <td> Steps</td>
        <td>Notes</td>
    </tr>
    <tr>
        <td>
            Set up
        </td>
        <td>Download Heroku toolbelt https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up
            <br> heroku login (email/password)"</td>
    </tr>
    <tr>
        <td>
            Prepare the app </td>
        <td>I recommend creating a new repo and making your app master rather than using a forked repo git clone
            <your app> into your new working folder cd
                <your app>"</td>
    </tr>
    <tr>
        <td>
            Deploy the app
        </td>
        <td> "heroku create xxxx-xxxx-xxxx-xxxx<br> I like to make up my own name but I follow their pattern `git push heroku master` <br>`heroku ps:scale web=1` get an instance running<br> `heroku open` this will open a browser and attempt to load your "/" path `heroku open icecream` this will open to a path you have set for example: https://becky-node-sun-777.herokuapp.com/icecream <br> NOTE: this will probably fail unless you've already set up your mongo addon"
        </td>
    </tr>
    <tr>
        <td>
            View Logs
        </td>
        <td>`heroku logs` --tail
</td>
</tr>
<tr>
<td>
        Define a Procfile </td><td>web: node index.js if heroku doesn't find a Procfile it will run npm start from your package.json </td>
</tr>
<tr>
<td>
         Scale the app  
</td><td>
          `heroku ps`
</td>
</tr>
<tr>
<td>
           Declare app dependencies </td>
<td>
           You may not need this if you have already got your project
            running locally npm init npm install
            </td>
    </tr>
    <tr>
        <td>
            Run the app locally</td>
        <td> `heroku local` <br>
         heroku manages ports: for local server it uses 5000 but on the cloud the may change To manage this you will want to change your server listen to something which will let heroku assign the port when it is running your server:
         ```
         app.listen(process.env.PORT
            || 3000, () => { console.log('up on 3000'); });
            ```
        </td>
    </tr>
    <tr>
        <td>
            Push local changes</td>
        <td> `git add .` <br> `git commit -m"reason for change"` <br> `git push heroku master` push to heroku repo<br> `git push origin master` push to git repo<br> `heroku open` open browser<br> Now you can test with Postman, cUrl or browser <br>NOTE: you still may have errors if you are
            deploying an app with addons"
        </td>
    </tr>
    <tr>
        <td>
            Provision add ons</td>
        <td> Focusing on adding mongo here: `heroku addons:create mongolab`
            <br> You will get this message if you haven't already provided a credit card: <br>
            *** Please verify your account to install this add-on plan (please enter a credit card) For more
            information, see https://devcenter.heroku.com/categories/billing Verify now at https://heroku.com/verify *** <br>
            After verified key in `heroku addons:create mongolab` again.  
            <br>
            NOTE: You will need a credit card which you can key in a heroku.com/verify
        </td>
    </tr>
    <tr>
        <td>
            Start a console</td>
        <td> `heroku run node` this will take you into repl on the cloud <br> `heroku run bash` this will give you a bash shell on the cloud. </td>
</tr>
<tr>
<td>

        Define config vars </td>
        <td> Create an .env file to store config variables that heroku will use locally, example below<br> `HTTP_TIMEOUT=10000`<br>
        `MONGODB_URI='mongodb://localhost/dev_db'`<br>
        use the following command to set config variables that will be used on the cloud <br>`heroku config:set MONGODB_URI='mongodb://dbuser:dbpass@host:port/dbname '` <br> You can view all you config settings with `heroku config` <br>
         To see your MONGODB_URL use `heroku config | grep MONGODB_URI`. <br> You can also go to your heroku dashboard in the browser and drill down from your app to resource settings to see your config values.</td>
    </tr>
    <tr>
        <td>
            Provision a database </td>
        <td>You can modify your connect code to use either local .env variables or code config variables or a default:<br>
        `const dbPort = process.env.MONGODB_URI || 'mongodb://localhost/dev_db ';`<br>
        `console.log('dbPort ', dbPort);`<br> `mongoose.connect(dbPort);`<br>

        <br>`heroku open` should now work</td>
    </tr>
</table>