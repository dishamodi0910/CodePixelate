// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const open = require("open");
const vscode = require('vscode');

//For few languages
const languages = [
	{name :'AUTO', ext : 'auto'},
    {name :'BASH', ext : 'bash'},
    {name : 'C',ext:'c'},
    {name :'CPP', ext : 'cpp'},
    {name :'CSH', ext :' c#'},
    {name :'CSS',ext :'css'},
    {name :'DART',ext :'dart'},
    {name :'ELM',ext :'elm'},
    {name :'ERLANG',ext :'erlang'},
    {name :'FSH',ext : 'f#'},
    {name :'GO',ext :'go'},
    {name :'HTML',ext : 'html'},
    {name :'JAVA',ext :'java'},
    {name :'JS',ext :'js'},
    {name :'JSON',ext : 'json'},
    {name :'JSX',ext : 'jsx'},
    {name :'MARKDOWN',ext :'md'},
    {name :'PERL',ext :'perl'},
    {name :'PHP',ext :'php'},
    {name :'PYTHON',ext :'py'},
    {name :'R',ext : 'r'},
    {name :'RUBY',ext :'ruby'},
    {name :'RUST',ext : 'rust'},
    {name :'SCSS',ext : 'scss'},
    {name :'SQL',ext :'sql'},
    {name :'SWIFT',ext :'swift'},
    {name :'TS',ext : 'ts'},
    {name :'TSX',ext : 'tsx'},
    {name :'VHDL',ext :'vhdl'},
    {name :'YAML',ext :'yml'},
];


//A function to get the file extension name.
 function getFileExtension()
 {
	const file = vscode.window.activeTextEditor.document.fileName;
	const spilt_filename = file.split('.');	//Separate name and extension of file
	if(!spilt_filename)
	return;
	//Convert extension name to lower case
	const exts = spilt_filename[spilt_filename.length-1].toLowerCase();
	//Getting the langauge name
	const [language] = languages.filter(extsg => extsg .ext==exts );
	if(language==undefined)
	return 'auto';
	else
	return language.ext;
 }


 //If we see properly in url of sample we try in ray.so, then the way it uses code is encoded format, so we need to encode the code.
 /**
 * @param {String} str  Input string 
 * @returns {String}    Output Encoded
 */
 const getEncodedcode = str => Buffer.from(str).toString("base64");


//NAME OF PARAMS FROM URL SAMPLE ON RAY.SO
/**
 * Object of ray.so having various params, These params needs to be passed in the URl, then the url needs to be opened,you will get the required snapshot
 * @param {Object} [url_request] URL REQUEST
	* @param {('candy'|'breeze'|'midnight'|'sunset'|'crimson'|'falcon'|'meadow'|'raindrop')} [url_request.theme] Theme. 

	* @param {('true'|'false')} [url_request.background]	Want background or opaque
	* @param {('true'|'false')} [url_request.darkMode]		Dark Mode enables
	* @param {(
		'16'|
		'32'|
		'64'|
		'128'
	)} [url_request.padding]	Padding

	* @param {String} [url_request.title]	Title of snipper
	* @param {String} [url_request.language]	Language of code
	* @param {String} code		Code itself that you want to convert into image
	* @returns {String} Returns the URL of the snippet.
*/

//Generating URL
const generateParseURL = (code,url_request={}) => {
    //Getting params
	const urlparam = {...url_request,code:getEncodedcode(code),language : getFileExtension()},
    //Mapping and Encoding to valid URI format
	parameters = Object.keys(urlparam).map(key => `${key}=${encodeURIComponent(urlparam[key])}`).join("&");
    console.log(parameters);
    //Link
	return "https://ray.so/#" + parameters;

}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
 /**
 *	 @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "codepixelate" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('codepixelate.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		var editor = vscode.window.activeTextEditor;
		if(!vscode.window.activeTextEditor)
			return vscode.window.showErrorMessage('Need to open editor first!');
		const selectedText = editor.selection;
		if(!selectedText)
			return vscode.window.showErrorMessage('First, select text please!!');

		const text = editor.document.getText(selectedText);

		const raysourl = generateParseURL(text, {title:"Code_Pixelate",theme:"crimson",padding:"16"});
		console.log(raysourl);
		open(raysourl);

		// Display a message box to the user
		vscode.window.showInformationMessage('Thank you for using our CodePixelate!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
