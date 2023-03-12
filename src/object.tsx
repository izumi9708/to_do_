type obj = {
  id:string,
  name:string | null | undefined
}[]

const incompleteObj:obj = [
  {id:'0',name:'炊事'},
  {id:'1',name:'洗濯'},
  {id:'2',name:'掃除'},

  ];

  const completeObj:obj = [
    {id:'0',name:'レポート提出'},
    {id:'1',name:'課題作成'}
  ]

  export {incompleteObj,completeObj}