class Drumkit{
    constructor(){
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector(".play");
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 150;
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
            setInterval(()=>{
                
                this.repeat();
            },interval); //1000 milisecond = 1 sec;
        }
}

const drumkit = new Drumkit();




drumkit.pads.forEach(pad =>{
pad.addEventListener('click',drumkit.activePad);
pad.addEventListener('animationend',function(){
this.style.animation = "";
});
});
drumkit.playBtn.addEventListener('click',function()
{
    
    drumkit.start();
});