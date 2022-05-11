
const COL_NO_TIME_STAMP = 0;
const COL_NO_MAIL = 1;
const COL_NO_NAME = 2;
const COL_NO_TOU = 3;
const COL_NO_IMAGE = 4;
const COL_NO_Q_1 = 5;
const COL_NO_Q_2 = 7;
const COL_NO_Q_3 = 6;
const COL_NO_Q_4 = 8;
const COL_NO_Q_ANS = 9;
const COL_NO_FREE = 10;
const COL_NO_TYPE = 11;
const COL_NO_URL = 26;
const COL_NO_TWITTER = 27;


const TYPE_KUCHO = '中野区長選挙';
const TYPE_KUGI = '中野区議会議員補欠選挙';

function csv_data_get(dataPath) {
    // CSVファイルを文字列として取得
    let srt = new XMLHttpRequest();
    srt.open("GET", dataPath, false);
    try {
        srt.send(null);
    } catch (err) {
        console.log(err);
    }

    // 配列を用意
    let csletr = [];

    // 改行ごとに配列化 
    let lines = CSVToArray( srt.responseText, ',' )
    //console.log(lines);
    
    return lines;
    // 改行ごとに配列化
    //let lines = srt.responseText.split("\n");

    // 1行ごとに処理
    //for (let i = 0; i < lines.length; i++) {
        // 文字列の最後が"ではない場合、途中で切ってしまったと判断し、
        // 次の列と繋げる。(ただし、２回以上改行が入っているとうまく動かない・・・)
        //if(lines[i].slice( -1 ) != '"') {
        //    lines[i] = lines[i]+lines[i+1];
        //} else if(lines[i].slice(0,1) != '"'){
        //    break;
        //}

    //    let cells = lines[i].split(",");
    //    if (cells.length != 1) {
    //        csletr.push(cells);
    //    }

        
    //}
    //return csletr;

}

// CSVを読みだしたリストから、指定した大部のデータのみ取得する
// type: TYPE_KUCHO, TYPE_KUGI
function get_type(csv_list, type){
    
     // 配列を用意
     let csletr = [];
     for (var i = 0; i < csv_list.length; i++) { 
         let data = csv_list[i];
         
         if(data[COL_NO_TYPE] == type){
             csletr.push(data);
         }
     }
 
     return csletr;
    
}

// トップ画像用のdivセットを生成する（タイプごと）
function draw_top(kouho, type){
    let divListList = [];

    for (var i = 0; i < kouho.length; i++) { 
        var divList = document.createElement('div'); 
        divList.setAttribute('class', "col-md-6"); 
        divList.textContent = kouho[i][COL_NO_NAME];
        //var name_string = cat_dc(kouho[i][COL_NO_NAME]);
        //divList.textContent = name_string;

        let divItem = document.createElement('div');
        divItem.setAttribute('class', "col-3");
        
        let image = document.createElement('img');
        if(type == TYPE_KUCHO){
            image.src = 'pic/kucho' + i + ".jpg";
        } else {
            image.src = 'pic/kugi' + i + ".jpg";
        }
        image.setAttribute('class', 'img-fluid');
        divItem.appendChild(image);
        divItem.appendChild( document.createElement( 'br' ) );
        
        //候補者のウェブサイトURL追加
        let websiteURL = document.createElement("a");
        websiteURL.setAttribute("href",kouho[i][COL_NO_URL]);
        let URLtext = document.createTextNode(kouho[i][COL_NO_URL]);
        divItem.appendChild(websiteURL).appendChild(URLtext);
        divItem.appendChild( document.createElement( 'br' ) );

        //候補者のツイッターアカウント追加
        let twitterID = document.createElement("a");
        twitterID.setAttribute("href",kouho[i][COL_NO_TWITTER]);
        let TwitterText = document.createTextNode(kouho[i][COL_NO_TWITTER]);
        divItem.appendChild(twitterID).appendChild(TwitterText);

        


        // a 要素の作成と属性の指定
        var newAnchor = document.createElement("a");
        newAnchor.appendChild( divItem );
        if(type == TYPE_KUCHO){
            newAnchor.setAttribute("href", "kucho.html#"+kouho[i][COL_NO_NAME]);
        } else {
            newAnchor.setAttribute("href", "kugiho.html#"+kouho[i][COL_NO_NAME]);
        }

        divList.appendChild(newAnchor);
        //divList.appendChild(divItem);
    
        divListList.push(divList);
    }
    return divListList;
}

// 文字列の先頭と末尾を削除する
function cat_dc(string){
    var new_string = string.slice(1);
    var new_string2 = new_string.slice(0,-1);
    return new_string2;
}

	// This will parse a delimited string into an array of
	// arrays. The default delimiter is the comma, but this
	// can be overriden in the second argument.
	function CSVToArray( strData, strDelimiter ){
		// Check to see if the delimiter is defined. If not,
		// then default to comma.
		strDelimiter = (strDelimiter || ",");

		// Create a regular expression to parse the CSV values.
		var objPattern = new RegExp(
			(
				// Delimiters.
				"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

				// Quoted fields.
				"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

				// Standard fields.
				"([^\"\\" + strDelimiter + "\\r\\n]*))"
			),
			"gi"
			);


		// Create an array to hold our data. Give the array
		// a default empty first row.
		var arrData = [[]];

		// Create an array to hold our individual pattern
		// matching groups.
		var arrMatches = null;


		// Keep looping over the regular expression matches
		// until we can no longer find a match.
		while (arrMatches = objPattern.exec( strData )){

			// Get the delimiter that was found.
			var strMatchedDelimiter = arrMatches[ 1 ];

			// Check to see if the given delimiter has a length
			// (is not the start of string) and if it matches
			// field delimiter. If id does not, then we know
			// that this delimiter is a row delimiter.
			if (
				strMatchedDelimiter.length &&
				(strMatchedDelimiter != strDelimiter)
				){

				// Since we have reached a new row of data,
				// add an empty row to our data array.
				arrData.push( [] );

			}


			// Now that we have our delimiter out of the way,
			// let's check to see which kind of value we
			// captured (quoted or unquoted).
			if (arrMatches[ 2 ]){

				// We found a quoted value. When we capture
				// this value, unescape any double quotes.
				var strMatchedValue = arrMatches[ 2 ].replace(
					new RegExp( "\"\"", "g" ),
					"\""
					);

			} else {

				// We found a non-quoted value.
				var strMatchedValue = arrMatches[ 3 ];

			}


			// Now that we have our value string, let's add
			// it to the data array.
			arrData[ arrData.length - 1 ].push( strMatchedValue );
		}

		// Return the parsed data.
		return( arrData );
	}


    /* 汎用関数 ht_str()   プレーンテキストの & < > スペース タブ をHTMLに変換 */

    function ht_str( str )
    {
        if( str == null ) return '';
        str = str.toString();
        str = str.replace( /&/g,'&amp;' );
        str = str.replace( /</g,'&lt;' );
        str = str.replace( />/g,'&gt;' );
        str = str.replace( / /g,'&nbsp;' );
        str = str.replace( /\t/g,'&nbsp;&nbsp;&nbsp;&nbsp;' ); // Tabをスペース4つに..
        str = str.replace( /\r?\n/g, "<br/>\n");
        return str;
    }

    // 回答結果に改行が含まれる場合に、brタグを入れて追加する
    function setDivList(divList, divItem, texts)
    {   
            var lines = texts.split("\n");
            console.log("lines.length=" + lines.length);
            for(j = 0; j < lines.length; j++){
                divList.appendChild(divItem).appendChild( document.createTextNode(lines[j]));
                divList.appendChild(divItem).appendChild( document.createElement( 'br' ) );
            }
    }


    // 詳細画面生成用
    function draw_detail(kouho, type){
        let divListList = [];

        for (var i = 0; i < kouho.length; i++) { 
            var divList = document.createElement('div'); 
            divList.setAttribute('class', "col-md-60"); 

        //名前
            let divItem_1 = document.createElement('div');
            divItem_1.setAttribute('class',"mycol-1"); 
            divItem_1.setAttribute('id', kouho[i][COL_NO_NAME]);  
            //var newtext_1=document.createTextNode(kouho[i][COL_NO_NAME]);
            setDivList(divList, divItem_1, kouho[i][COL_NO_NAME]);
            
        //イメージ作成
            let image = document.createElement('img');
                if(type == TYPE_KUCHO){
                    image.src = 'pic/kucho' + i + ".jpg";
                } else {
                image.src = 'pic/kugi' + i + ".jpg";
            }
            image.setAttribute('class', 'circle');
            divList.appendChild(image);

        //党 divItem_2
            let divItem_2=document.createElement('div');
            divItem_2.setAttribute('class', "mycol-2");
            var newtext_2 =  document.createTextNode(kouho[i][COL_NO_TOU]); 
            //divList.appendChild(divItem_2).appendChild(newtext_2);  
            setDivList(divList, divItem_2, kouho[i][COL_NO_TOU]); 

        //Q1 質問　divItem_3
            let divItem_3= document.createElement('div');
            divItem_3.setAttribute('class', "mycol-3");
            var newtext_3=document.createTextNode('質問１. 子育て世代へアピールしたいことは何ですか？')
            divList.appendChild(divItem_3).appendChild(newtext_3);

        //Q1　回答 divItem_4
            let divItem_4 = document.createElement('div');
            divItem_4.setAttribute('class', "mycol-4");
            var newtext_4 =  document.createTextNode(kouho[i][COL_NO_Q_1]);
            setDivList(divList, divItem_4, kouho[i][COL_NO_Q_1]);

        //Q2 質問　divItem_5
            let divItem_5= document.createElement('div');
            divItem_5.setAttribute('class', "mycol-5");
            var newtext_5=document.createTextNode('質問２．ご自身が小学生の頃、どこで何をして遊んでいましたか？')
            divList.appendChild(divItem_5).appendChild(newtext_5);

        //Q2　回答 divItem_6
            let divItem_6 = document.createElement('div');
            divItem_6.setAttribute('class', "mycol-6");
            var newtext_6 =  document.createTextNode(kouho[i][COL_NO_Q_2]);
            setDivList(divList, divItem_6, kouho[i][COL_NO_Q_2]);

        //Q3 質問　divItem_7
            let divItem_7= document.createElement('div');
            divItem_7.setAttribute('class', "mycol-7");
            var newtext_7=document.createTextNode('質問３．中野区の子育て支援で、何に一番力を入れたいですか？')
            divList.appendChild(divItem_7).appendChild(newtext_7);

        //Q3　回答 divItem_8
            let divItem_8 = document.createElement('div');
            divItem_8.setAttribute('class', "mycol-8");
            setDivList(divList, divItem_8, kouho[i][COL_NO_Q_3]);

        //Q4　質問 divItem_9
            let divItem_9 = document.createElement('div');
            divItem_9.setAttribute('class', "mycol-9");
            var newtext_9 =  document.createTextNode('質問４．有権者からの質問への回答');
            divList.appendChild(divItem_9).appendChild(newtext_9);

        //Q4　質問番号 divItem_10
            let divItem_10 = document.createElement('div');
            divItem_10.setAttribute('class', "mycol-10");
            var newtext_10 =  document.createTextNode('質問番号'+kouho[i][COL_NO_Q_4]+'番');
            divList.appendChild(divItem_10).appendChild(newtext_10);

        //Q4　回答 divItem_11
            let divItem_11 = document.createElement('div');
            divItem_11.setAttribute('class', "mycol-11");
            var newtext_11 =  document.createTextNode(kouho[i][COL_NO_Q_ANS]);
            setDivList(divList, divItem_11, kouho[i][COL_NO_Q_ANS]);

        //Q5　質問 divItem_12
        if(kouho[i][12] != null){
            let divItem_12 = document.createElement('div');
            divItem_12.setAttribute('class', "mycol-12");
            var newtext_12 =  document.createTextNode('質問４．有権者からの質問への回答２');
            divList.appendChild(divItem_12).appendChild(newtext_12);

        //Q5　質問番号 divItem_13
            let divItem_13 = document.createElement('div');
            divItem_13.setAttribute('class', "mycol-13");
            var newtext_13 =  document.createTextNode('質問番号'+kouho[i][12]+'番');
            divList.appendChild(divItem_13).appendChild(newtext_13);

        //Q5　回答 divItem_14
            let divItem_14 = document.createElement('div');
            divItem_14.setAttribute('class', "mycol-14");
            var newtext_14 =  document.createTextNode(kouho[i][13]);    
            setDivList(divList, divItem_14, kouho[i][13]);
        }
            //　続きを読む　divItem_n
            let divItem_n=document.createElement('div');
            divItem_n.setAttribute('class', "mycol-n");
            var input_item= document.createElement('input');
            input_item.setAttribute('class',"acd-check"+ i);
            input_item.setAttribute('id',"acd-check" + i);
            input_item.setAttribute('type',"checkbox");
            let label_item= document.createElement('label');
            label_item.setAttribute('class',"acd-label");
            label_item.setAttribute('for',"acd-check" + i);
            var newtext_n =document.createTextNode('▶続きを読む');
            let divItem_n2=document.createElement('div');
            divItem_n2.setAttribute('class',"acd-content");
            var newtext_n2 =document.createTextNode('testtest');//⇐ここに文章を追加
            
 
        //appendChild     
            //divList.appendChild(divItem_1).appendChild(newtext_1);
            //divList.appendChild(image);
            //divList.appendChild(divItem_2).appendChild(newtext_2);
            //divList.appendChild(divItem_3).appendChild(newtext_3);
            //divList.appendChild(divItem_4).appendChild(newtext_4);
            //divList.appendChild(divItem_5).appendChild(newtext_5);
            //divList.appendChild(divItem_6).appendChild(newtext_6);
            //divList.appendChild(divItem_7).appendChild(newtext_7);
            //divList.appendChild(divItem_8).appendChild(newtext_8);
            //divList.appendChild(divItem_9).appendChild(newtext_9);
            //divList.appendChild(divItem_10).appendChild(newtext_10);
            //divList.appendChild(divItem_11).appendChild(newtext_11);

            
            //divList.appendChild(divItem_12).appendChild(newtext_12);
            //divList.appendChild(divItem_13).appendChild(newtext_13);
            //divList.appendChild(divItem_14).appendChild(newtext_14);
            divList.appendChild(divItem_n).appendChild(input_item);
            divItem_n.appendChild(label_item).appendChild(newtext_n);
            divItem_n.appendChild(divItem_n2).appendChild(newtext_n2);
            
            divListList.push(divList);
        }
        return divListList;
    }
