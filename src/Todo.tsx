import React, { Fragment, useState , useEffect, useRef } from "react";
import './todo.css';
import {incompleteObj,completeObj} from './object';
// import { useSwipeable } from "react-swipeable";
// import { isDOMComponent } from "react-dom/test-utils";
// import { create } from "domain";
// import { stringify } from "querystring";
// import { promises } from "stream";
// import { ADDRCONFIG } from "dns";


function Todo(){
  const [incomplete,setIncomplete] = useState(incompleteObj);
  const [complete,setComplete] = useState(completeObj);

  function deleteIncomplete(e:React.MouseEvent<HTMLDivElement, MouseEvent>){
    const {currentTarget} = e;
    
    if(!(currentTarget instanceof HTMLDivElement)){
      return false;
    }
    
    if(window.confirm('このタスクを削除してよろしいですか?')){
      setIncomplete(
        incomplete.filter((x)=>x.id !== currentTarget.closest('.incomplete-item')?.id)
      )    
    }
  
  }

  function deleteComplete(e:React.MouseEvent<HTMLDivElement, MouseEvent>){
    const {currentTarget} = e;
    
    if(!(currentTarget instanceof HTMLDivElement)){
      return false;
    }
    
    if(window.confirm('このタスクを削除してよろしいですか?')){
      setComplete(
        complete.filter((x)=>x.id !== currentTarget.closest('.complete-item')?.id)
      )    
    }
  
  }

  function parentAction(e:React.MouseEvent<HTMLDivElement, MouseEvent>){
    const {target} = e;
    
    if(!(target instanceof HTMLDivElement)){
      return false;
    }

    const checkbox = target.querySelector('input');
    if(checkbox){
      checkbox.checked = (checkbox.checked) ? false : true;
      checked(checkbox)
    }
    
  }

  function checked(event:HTMLInputElement){        
    setIncomplete(
      incomplete.filter((x)=>x.id !== event.closest('.incomplete-item')?.id)
    )

    const incompleteName = event.closest('.incomplete-item')?.textContent;
    const id             = (complete.length == 0) ? 0 : Number(complete.slice(-1)[0].id) + 1;
    const newObj         = { id:String(id) , name:incompleteName }
    setComplete([...complete,newObj]);

    const inputs:NodeListOf<HTMLInputElement> = document.querySelectorAll('.incomplete-wrap input[type="checkbox"]:checked');

    inputs.forEach(val=>{
      val.checked = false;
    })    
    
  }

  function chnageAddInput(e: React.ChangeEvent<HTMLInputElement>){
    const addComfirm = document.querySelector('.add-confirm');

    if(addComfirm instanceof HTMLButtonElement){
      if(e.target.value !== '' && addComfirm){
          addComfirm.disabled = false;
          addComfirm.onclick = addIncomplete;
          if(!addComfirm.classList.contains('add-color'))addComfirm.classList.add('add-color');

      }else {
          addComfirm.disabled = true;
          if(addComfirm.classList.contains('add-color'))addComfirm.classList.remove('add-color');
      }
      
    }
    
  }

  function addIncomplete(){
    const input = document.querySelector('.add-input input');
    
    if(input && input instanceof HTMLInputElement){
      if(input.value !== ''){
        const incompleteName = input.value;
        const id             = (incomplete.length == 0) ? 0 : Number(incomplete.slice(-1)[0].id) + 1;        
        const newObj         = { id:String(id) , name:incompleteName }
        
        setIncomplete([...incomplete,newObj]);
        closeAddWrap();
      }
      
    }
    
    
  }

  

  function openAddWrap(){
    const addWrap    = document.querySelector('.add-wrap');
    const addContent = document.querySelector('.add-content');

    if(!addWrap?.classList.contains('open-add-wrap')){
      addWrap?.classList.add('open-add-wrap');
      addContent?.classList.add('open-add-content');
      
      addInput.current?.focus();
    }
    
  }

  function closeAddWrap(){
    const addWrap    = document.querySelector('.add-wrap');
    const addContent = document.querySelector('.add-content');
    const addInput   = document.querySelector('.add-input input');

    if(addWrap?.classList.contains('open-add-wrap')){
      addWrap?.classList.remove('open-add-wrap');
      addContent?.classList.remove('open-add-content');
      
      if(addInput instanceof HTMLInputElement){
        addInput.value = '';
      }
      
    }
  }

  // ーーーーーーーーーーーーー

  const createIncomplete:JSX.Element[] = [];

  incomplete.forEach((val,index)=>{
    const num = String(index);

    createIncomplete.push(
        <div onClick={(e)=>parentAction(e)} className="incomplete-item" id={val.id} key={num}>
          <input type="checkbox"/>{val.name}
          <div onClick={(e)=>deleteIncomplete(e)} className="delete-icon"><svg viewBox="0 0 448 512" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64C0 81.7 14.3 96 32 96H416C433.7 96 448 81.7 448 64C448 46.3 433.7 32 416 32H320L312.8 17.7C307.4 6.8 296.3 0 284.2 0H163.8C151.7 0 140.6 6.8 135.2 17.7ZM416 128H32L53.2 467C54.8 492.3 75.8 512 101.1 512H346.9C372.2 512 393.2 492.3 394.8 467L416 128Z" fill="#AFAFAF"/></svg></div>
        </div>
    )
    
  })

  const createComplete:JSX.Element[] = [];

  complete.forEach((val,index)=>{
    const num = String(index);

    createComplete.push(
      <div className="complete-item"  id={val.id} key={num}>
        {val.name}
        <div className="delete-icon" onClick={(e)=>deleteComplete(e)}>
          <svg viewBox="0 0 448 512" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64C0 81.7 14.3 96 32 96H416C433.7 96 448 81.7 448 64C448 46.3 433.7 32 416 32H320L312.8 17.7C307.4 6.8 296.3 0 284.2 0H163.8C151.7 0 140.6 6.8 135.2 17.7ZM416 128H32L53.2 467C54.8 492.3 75.8 512 101.1 512H346.9C372.2 512 393.2 492.3 394.8 467L416 128Z" fill="#AFAFAF"/></svg>
        </div>
      </div>
    )
    
  })

  const height:number = window.innerHeight;
  const body:HTMLBodyElement = document.getElementsByTagName('body')[0];

  body.style.height = height + 'px';

  window.addEventListener('resize',()=>{
    const height:number = window.innerHeight;
    const body:HTMLBodyElement = document.getElementsByTagName('body')[0];

    body.style.height = height + 'px';
  })

  const addInput = useRef<HTMLInputElement>(null);

  
  
  return (
    <>
    <header>ToDo</header>
    <div className="main-content">
    
      <div className="incomplete-wrap">
        <div className="wrap-title">未完了のタスク</div>
        <div className="wrap-content incomplete-wrap">
          { (createIncomplete.length == 0) ? <div className="no-incomplete">未完了のタスクはありません</div> : createIncomplete }
        </div>
      </div>

      <div className="complete-wrap">
        <div className="wrap-title">完了済みのタスク</div>
          <div className="wrap-content complete-wrap">
            { (createComplete.length == 0) ? <div className="no-complete">完了済みのタスクはありません</div> : createComplete }
          </div>
      </div>

      <div className="add-btn-wrap">
        <button type="button" className="add-btn" onClick={()=>openAddWrap()}>
          <svg  viewBox="0 0 720 721" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M309.5 10V298C309.5 303.523 305.023 308 299.5 308H10C4.47715 308 0 312.477 0 318V402.5C0 408.023 4.47716 412.5 10 412.5H299.5C305.023 412.5 309.5 416.977 309.5 422.5V710.5C309.5 716.023 313.977 720.5 319.5 720.5H402.5C408.023 720.5 412.5 716.023 412.5 710.5V422.5C412.5 416.977 416.977 412.5 422.5 412.5H710C715.523 412.5 720 408.023 720 402.5V318C720 312.477 715.523 308 710 308H422.5C416.977 308 412.5 303.523 412.5 298V10C412.5 4.47715 408.023 0 402.5 0H319.5C313.977 0 309.5 4.47716 309.5 10Z" fill="#ffff"/></svg>
          タスクを新規作成
        </button>
      </div>

      <div className="add-wrap">
        <div className="add-bg" onClick={()=>closeAddWrap()}></div>
        <div className="add-content">
          <div className="add-inner">
            <h2 className="add-title">新規タスク</h2>
            <p className="add-text">新規タスクを作成してください</p>
            <div className="add-input"><input onChange={(e)=>chnageAddInput(e)} ref={addInput} type="text" placeholder="タスク名"/></div>
          </div>
          <div className="add-click-wrap">
            <button type="button" className="add-cancel" onClick={()=>closeAddWrap()} >キャンセル</button>
            <button type="button" className="add-confirm" disabled onClick={()=>addIncomplete()}>作成する</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Todo;