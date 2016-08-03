### Summary of Steps to deploy Node and Mongo to Heroku
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
            <br>heroku login (email/password)</td>
    </tr>
    <tr>
        <td>
            Prepare the app </td>
        <td>Create a new repo and making your app master rather than using a forked repo<br>
         `git clone <your app>` into your new working folder and remove .git from an existing folder and `git init` (https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/)
                </td>
    </tr>
    <tr>
        <td>
            Deploy the app
        </td>
        <td> `heroku create xxxx-xxxx-xxxx-xxxx`
         Your name can be anything not already in use.   
         `git push heroku master` <br>`heroku ps:scale web=1` get an instance running<br> `heroku open` this will open a browser and attempt to load your "/" path  
         `heroku open icecream` this will open to a path you have set  
         for example: https://becky-401-8.herokuapp.com/icecream <br> <b>NOTE: this will fail unless you've already set up your mongo addon<b>
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
        Define a Procfile </td><td>  
        web: node index.js  
        If heroku doesn't find a Procfile it will run `npm start` from your package.json </td>
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
          This is to get the project running locally.
           You may not need this if you have already got your project running locally.  
           `npm init`,
            `npm install`  
            </td>
    </tr>
    <tr>
        <td>
            Run the app locally</td>
        <td> `heroku local` <br>
         <b>heroku manages ports: for local server it uses 5000 but on the cloud that may change</b>.Modify server listen to make port variable and accessed from process.env.PORT.   
         ```
         app.listen(process.env.PORT
            || 3000, () => { console.log('up on '+ process.env.PORT
               || 3000); });
            ```
        </td>
    </tr>
    <tr>
        <td>
            Push local changes</td>
        <td> `git add .` <br> `git commit -m"reason for change"` <br> `git push heroku master` push to heroku repo<br> `git push origin master` push to git repo<br> `heroku open` open browser<br> Now you can test with Postman,httpie, cUrl or browser <br><b>NOTE: this will fail unless you've already set up your mongo addon</b>
        </td>
    </tr>
    <tr>
        <td>
            <b>Provision add ons</b></td>
        <td> Focusing on adding mongo here  
        `heroku addons:create mongolab`
            <br> You will get this message if you haven't already provided a credit card: <br>
            *** Please verify your account to install this add-on plan (please enter a credit card) For more
            information, see https://devcenter.heroku.com/categories/billing Verify now at https://heroku.com/verify *** <br>
            After verified key in `heroku addons:create mongolab` again.  

        </td>
    </tr>
    <tr>
        <td>
            Start a console</td>
        <td> `heroku run node` this will take you into repl on the cloud <br> `heroku run bash` this will give you a bash shell on the cloud. </td>
</tr>
<tr>
<td>

        <b>Define config vars</b> </td>
        <td> MONDGODB_URI gets added to heroku config when you use addons: command above.  
        You can create an <b>.env</b> file to store config variables that heroku will use <b>locally</b>, example below<br>
        `MONGODB_URI='mongodb://localhost/dev_db'`<br>
        use the following command to set config variables that will be used on the cloud <br>`heroku config:set MONGODB_URI='mongodb://dbuser:dbpass@host:port/dbname '` <br> You can view all you config settings with `heroku config` <br>
         To see your MONGODB_URL use `heroku config | grep MONGODB_URI`. <br> Also see app configs in online dashobard.</td>
    </tr>
    <tr>
        <td>
            <b>Provision a database</b> </td>
        <td>Modify your connect code to use either local process.env variables or a default:<br>
        `const dbServer = process.env.MONGODB_URI || 'mongodb://localhost/dev_db ';`<br>
        `console.log('connecting to dbServer ', dbServer);`<br> `mongoose.connect(dbServer);`
        <br>`heroku open` should now work</td>
    </tr>
</table>
