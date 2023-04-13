
const reports = ()=>{
    const reportsArr = [
        `1)sebet modalinda + - edende sebet sehifesinde bunlar olmur !`,
        `2)sebet modalinda x e basanda silinme gedir ,load ekran islemir ,yenilenme geitr !`,
        `3)sebet sehife ve modalina umumi sehifeye websocket elave olunmalidir !`,
        `4)anbardan cixaris modalinda axtaris etdikden sonra cixaris etmeye calisanda problem yaranir !`

    ]
    console.log(`======================================================================== \n ==========*agla gelen basqa problem olsa elave olunacaq...*===========\n========================================================================`)
    reportsArr.map(fuckinissue=>{
        console.log(`~${fuckinissue}~`);
    })
}
module.exports = reports