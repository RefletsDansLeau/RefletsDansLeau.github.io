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

const TYPE_KUCHO = '"中野区長選挙"';
const TYPE_KUGI = '"中野区議会議員補欠選挙"';

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
    let lines = srt.responseText.split("\n");

    // 1行ごとに処理
    for (let i = 0; i < lines.length; i++) {
        // 文字列の最後が"ではない場合、途中で切ってしまったと判断し、
        // 次の列と繋げる。(ただし、２回以上改行が入っているとうまく動かない・・・)
        if(lines[i].slice( -1 ) != '"') {
            lines[i] = lines[i]+lines[i+1];
        } else if(lines[i].slice(0,1) != '"'){
            break;
        }

        let cells = lines[i].split(",");
        if (cells.length != 1) {
            csletr.push(cells);
        }
    }
    return csletr;

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
        var name_string = cat_dc(kouho[i][COL_NO_NAME]);
        //divList.textContent = cat_dc(kouho[i][COL_NO_NAME]);
        divList.textContent = name_string;

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

        divList.appendChild(divItem);
    
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

