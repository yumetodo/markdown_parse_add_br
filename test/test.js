import test from "ava";
var MarkdownParseAddBr = require("../index.js");
var colors = require('colors');
var jsdiff = require('diff');
const base_str = "どこからどう見ても小学生の自分、『江戸川コナン』。  \r\nそれがまさか、妙な組織に妙な薬を飲まされた所為で身体が小さくなっただなんて。  \r\n本当は——『高校生探偵』 工藤新一なんだってことを知るものは、ほんのわずかなのだから。\r\n\r\n```\r\n「『名探偵』 殿へ  \r\n\r\nこの度、我が古橋家の別荘において 『宝捜し』 を行うこととなりました。つきましては名探偵として名高い貴方様にもぜひご参加いただきたく、お手紙を差し上げました。  \r\n隠されているのは古橋家先祖の遺産、その価値は数十億にのぼるとも言われておりますが、見事発見されたなら、その全てを貴方に差し上げます。  \r\nもし参加していただけるなら、下記の日時に同封のプレートを持って別荘にお越しくださるよう——」\r\n```\r\n\r\n「——プレート?」  \r\n蘭は眉を寄せた。そんなもの一緒に入っていただろうか…？";

const correct_result = `どこからどう見ても小学生の自分、『江戸川コナン』。<br>
それがまさか、妙な組織に妙な薬を飲まされた所為で身体が小さくなっただなんて。<br>
本当は——『高校生探偵』 工藤新一なんだってことを知るものは、ほんのわずかなのだから。

\`\`\`
「『名探偵』 殿へ  

この度、我が古橋家の別荘において 『宝捜し』 を行うこととなりました。つきましては名探偵として名高い貴方様にもぜひご参加いただきたく、お手紙を差し上げました。  
隠されているのは古橋家先祖の遺産、その価値は数十億にのぼるとも言われておりますが、見事発見されたなら、その全てを貴方に差し上げます。  
もし参加していただけるなら、下記の日時に同封のプレートを持って別荘にお越しくださるよう——」
\`\`\`

「——プレート?」<br>
蘭は眉を寄せた。そんなもの一緒に入っていただろうか…？`;


test("parse test include code block.", t => {
	const re = MarkdownParseAddBr.parse(base_str);
	let diff = jsdiff.diffChars(correct_result, re);
	diff.forEach(function(part){
		// green for additions, red for deletions 
		// grey for common parts 
		var color = part.added ? 'green' : part.removed ? 'red' : 'grey';
		process.stderr.write(part.value[color]);
	});
	t.true(correct_result == re);
});
