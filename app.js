const baseUrl = 'https://api.github.com/repos/ali-shokoohi/ali-shokoohi.github.io/contents/storage/';
const fillString = async (url, htmlString='') => {
  htmlString += '<ul>';
  const response = await fetch(url);
  const data = await response.json();
  for (let file of data) {
    htmlString += `<li>`
    if (file.download_url){
      const size = file.size > 1000000 ? (file.size/1000000).toFixed(2) + ' MB' : (file.size/1000).toFixed(2) + ' KB';
      htmlString += `<a href="${file.download_url}">${file.name}</a>`+` <span justify='center'>${size}</span>`;
    }else{
      htmlString += file.name;
      htmlString = await fillString(url=file.url, htmlString=htmlString);
    }
    htmlString += `</li>`
  }
  htmlString += '</ul>';
  return htmlString;
};
fillString(url=baseUrl).then(result =>
  document.getElementById('root').innerHTML = result
);