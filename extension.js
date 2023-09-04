// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const open = require("open");
const vscode = require('vscode');

//For few languages
const languages = [
	{name :'auto', ext : 'auto'},
    {name :'bash', ext : 'sh'},
    {name : 'c',ext:'c'},
    {name :'cpp', ext : 'cpp'},
    {name :'csharp', ext :' cs'},
	{name : 'clojure',ext:'clj'},
    {name :'css',ext :'css'},
    {name :'dart',ext :'dart'},
	{name : 'dockerfile',ext:'dockerfile'},
    {name :'elm',ext :'elm'},
    {name :'erlang',ext :'erlang'},
    {name :'go',ext :'go'},
	{name : 'haskell', ext:'hs'},
    {name :'html',ext : 'html'},
    {name :'java',ext :'java'},
    {name :'javascript',ext :'js'},
    {name :'json',ext : 'json'},
    {name :'jsx',ext : 'jsx'},
	{name : 'kotlin',ext:'kt'},
	{name:'lisp',ext:'lsp'},
	{name:'lua',ext:'lua'},
    {name :'markdown',ext :'md'},
	{name : 'matlab',ext:'m'},
	{name:'objectivec',ext:'h'},
	{name:'plaintext',ext:'txt'},
    {name :'perl',ext :'perl'},
    {name :'php',ext :'php'},
    {name :'python',ext :'py'},
    {name :'r',ext : 'r'},
    {name :'ruby',ext :'rb'},
    {name :'rust',ext : 'rs'},
	{name:'scala',ext:'scala'},
    {name :'scss',ext : 'scss'},
    {name :'sql',ext :'sql'},
    {name :'swift',ext :'swift'},
    {name :'typescript',ext : 'ts'},
    {name :'tsx',ext : 'tsx'},
    {name :'xml',ext :'xml'},
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
	return language.name;
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
