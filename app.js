class Drumkit{
    constructor(){
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector(".play");
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 40;
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
           console.log(step);
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
});
drumkit.playBtn.addEventListener('click',function()
{
    
    drumkit.start();
});