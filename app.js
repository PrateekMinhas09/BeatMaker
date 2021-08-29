class Drumkit{
    constructor(){
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector(".play");
        this.currentKick = `./allSounds/kick-classic.wav`
        this.currentSnare = `./allSounds/snare-acoustic01.wav`
        this.currentHihat = `./allSounds/hihat-acoustic01.wav`
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;

        this.selects = document.querySelectorAll(`select`);
        this.muteBtns = document.querySelectorAll(`.mute`);
    }
    activePad()
    {
        console.log(this);
        this.classList.toggle("active");
    }
         repeat()
        {
            let step = this.index % 8;
           const activeBars = document.querySelectorAll(`.b${step}`);
           //loop over the pads
            activeBars.forEach(bar =>{
                bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
                //check if pads are active 
                if(bar.classList.contains(`active`))
                {
                //check which type of sound it is 
                    if(bar.classList.contains(`kick-pad`))
                    {
                        this.kickAudio.currentTime =0;
                        this.kickAudio.play();
                    }
                    else if(bar.classList.contains(`snare-pad`))
                    {
                        this.snareAudio.currentTime =0;
                        this.snareAudio.play();
                    }
                    else if(bar.classList.contains(`hihat-pad`))
                    {
                        this.hihatAudio.currentTime =0;
                    this.hihatAudio.play();
                    }
                }

            });
            this.index++;
        }
        start()
        {
            const interval = (60/this.bpm)*1000 // beats /minute and 1000 millisecond
           
            if(this.isPlaying == null)
            {
                this.isPlaying = setInterval(()=>{ // set INterval function returns a UNIQUE ID , each set 
                    //interval fucntion has their own Unique ID 
                        
                        this.repeat();
                    },interval); //1000 milisecond = 1 sec;
                    
            }
            else {
                //remove this.isplaying ,,, clear id 
                clearInterval(this.isPlaying);
                this.isPlaying = null;
        
            }

         
          
        }
        UpdateBtn()
        {
           if(this.isPlaying == null)
           {
               this.playBtn.innerText = "pause";
               this.playBtn.classList.add('active');

           }
           else{
            this.playBtn.innerText = "play";
            this.playBtn.classList.remove('active');
           }
        }

        changeSound(e)
        {
           
            const selectionName = e.target.name;
            const selectionValue = e.target.value;
            switch(selectionName)
            {
                case "kick-select":
                    this.kickAudio.src = selectionValue;
                    break;
                case "snare-select":
                    this.snareAudio.src = selectionValue;
                    break;
                case "hihat-select":
                    this.hihatAudio.src = selectionValue;
                    break;
            }


        }

        mute(e)
        {
const muteIndex = e.target.getAttribute(`data-track`);
e.target.classList.toggle(`active`);
if(e.target.classList.contains(`active`))
{
    switch(muteIndex)
    {
        case `0`:
            this.kickAudio.volume =0;
            break;
        case `1`:
            this.snareAudio.volume =0;
            break;
        case `2`:
            this.hihatAudio.volume =0;
            break;
    }
}
else{
    switch(muteIndex)
    {
        case `0`:
            this.kickAudio.volume =1;
            break;
        case `1`:
            this.snareAudio.volume =1;
            break;
        case `2`:
            this.hihatAudio.volume =1;
            break;
    }

}



        }
        
}

const drumkit = new Drumkit();


//EVENT LISTENERS






drumkit.pads.forEach(pad =>{
pad.addEventListener('click',drumkit.activePad);
pad.addEventListener('animationend',function(){
this.style.animation = "";
});
});
drumkit.playBtn.addEventListener('click',function()
{
    drumkit.UpdateBtn();
    drumkit.start();
   
});


drumkit.selects.forEach(select=>{
select.addEventListener(`change`, function(e){
drumkit.changeSound(e);
});
});


drumkit.muteBtns.forEach(btn=>{
btn.addEventListener(`click`, function(e){
drumkit.mute(e);
});
});