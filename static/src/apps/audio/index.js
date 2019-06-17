import React from 'react';
import './index.css'

class App extends React.Component {
    state = {
        muplayIcon: '#icon-play',
        circleIcon: '#icon-add',
        muName: '',
        duration: '',
        currentTime: '0:00',
        setInterval: '',
        currentLoction: 0,
        audio: '',
        backgroundImage:'url(/public/img/opat/3.jpg)',
        menuStatus:true,
        voiceFrequency:[
            {name:'canvas-line',key:1,transform:'translateX(0)', opacity:1,canvasWidth:800},
            {name:'canvas-cat',key:0,transform:'translateX(-100%)', opacity:0,canvasWidth:600},
            {name:'canvas-circle',key:2,transform:'translateX(100%)', opacity:0,canvasWidth:600},
        ],
        styleList : [
            {
                key: 1,
                site: 1,
                backgroundImage: '0',
                transform: 'translateX(-120px) translateZ(100px) rotateY(30deg)'
            },
            {
                key: 2,
                site: 2,
                backgroundImage: '3',
                transform: 'translateZ(300px)'
            },
            {
                key: 3,
                site: 3,
                backgroundImage: '7',
                transform: 'translateX(120px) translateZ(100px) rotateY(-30deg)'
            }
        ]
    };
    componentWillUnmount(){
        //重写组件的setState方法，直接返回空
        this.setState = (state,callback)=>{
            return;
        };
    }
    componentDidMount(){
        let audio = document.getElementById('audio');
        let url = audio.src;
        let musicName = url.split('/').pop().split('.')[0];

        this.setState({
            muName: musicName,
        });
        audio.oncanplay = () => {
            let sumtime = audio.duration;
            let duration = this.seTtime(sumtime);
            this.setState({
                duration: duration,
                // muplayIcon: '#icon-pause',
                setInterval: setInterval(this.setCurtTime, 1000),
                currentTime: 0,
                currentLoction: 0,
                audio
            }, () => {
                this.audioPlay()
            });
        };
    }
    audioPlay=()=> {
        let audio = this.state.audio;
        let AudioContext = window.AudioContext || window.webkitAudioContext;
        let audioContext = new AudioContext();
        let analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        analyser = audioContext.createAnalyser();
        let audioSrc = audioContext.createMediaElementSource(audio);
        // let audioSrc = audioCtx.createMediaStreamSource(audio) // 引入音频流
        audioSrc.connect(analyser);
        analyser.connect(audioContext.destination);
        this.setState({
            analyser
        },()=>{
            this.musicLine();
            this.musicCircle();
            this.musicCat();
        })
    };
    musicCat=()=>{
        const analyser=this.state.analyser;
        let canvasAudio = document.getElementById('canvas-cat');
        let ctx = canvasAudio.getContext("2d");
        canvasAudio.width = 800;
        canvasAudio.height =700;
        ctx.lineCap="round";
        let pia = Math.PI / 10;
       function render() {
            ctx.clearRect(0, 0, canvasAudio.width, canvasAudio.height);
            let dataArray = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(dataArray);

            let value= (dataArray[6]-100)*2;
            if(value<100){
                value=150
            }
            let valueye=  dataArray[90]/2;
            if(valueye>70){
                valueye=70
            }
            if(valueye<1){
                valueye=60
            }
            ctx.beginPath();
            ctx.strokeStyle = "#69fff7";
            ctx.shadowBlur = 10;
            ctx.lineWidth=5;
            ctx.lineTo((200) * Math.sin((pia))+400, (200) *Math.cos((pia))+400);
            ctx.quadraticCurveTo((value+200) * Math.sin((2*pia))+400,(value+200) *Math.cos((2*pia))+400,(200) * Math.sin((3*pia))+400, (200) *Math.cos((3*pia))+400);
            ctx.stroke();
            ctx.beginPath();
            ctx.lineTo((200) * Math.sin((-pia))+400, (200) *Math.cos((-pia))+400);
            ctx.quadraticCurveTo((value+200) * Math.sin(-(2*pia))+400,(value+200) *Math.cos(-(2*pia))+400,(200) * Math.sin(-(3*pia))+400, (200) *Math.cos(-(3*pia))+400);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(400,400,200,0,2*Math.PI);
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = "#ee225a";
            ctx.lineWidth=2;
            ctx.arc(300,460,60,0,2*Math.PI);
            ctx.closePath();
            ctx.fillStyle = '#ee225a';
            ctx.fill();
            ctx.stroke();
            ctx.beginPath();

            ctx.arc(500,460,60,0,2*Math.PI);
            ctx.closePath();
            ctx.fillStyle = '#ee225a';
            ctx.fill();
            ctx.stroke();
            ctx.beginPath();
            ctx.fillStyle = '#fff';
            ctx.fillRect(300,430, 5, valueye);
            ctx.stroke();
            ctx.beginPath();
            ctx.fillStyle = '#fff';
            ctx.fillRect(500,430, 5, valueye);
            ctx.stroke();
            ctx.beginPath();
            ctx.fillStyle = '#fd37f6';
            for (let i = 0; i < 20; i++) {
                let value= (dataArray[i*6])/6;
                ctx.fillRect(i * 5+400, 300, 2, -value + 1);
                ctx.fillRect(i * 5+400, 300, 2, value + 1);
                ctx.fillRect(-i * 5+400, 300, 2, -value + 1);
                ctx.fillRect(-i * 5+400, 300, 2, value + 1);
            }
            window.musicLineStop=  requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    };
    musicLine=()=>{
        const analyser=this.state.analyser;
        let canvasLine = document.getElementById('canvas-line');
        let ctx = canvasLine.getContext("2d");
        ctx.lineWidth = 2;
        let grd = ctx.createLinearGradient(0, 0, 600, 0);
        grd.addColorStop(0, "#00d0ff");
        grd.addColorStop(1, "#eee");

        let grd2 = ctx.createLinearGradient(0, 0, 600, 0);
        grd2.addColorStop(0, "#fff");
        grd2.addColorStop(1, "#e720ee");
        let het=0;
        function render() {
            ctx.clearRect(0, 0, canvasLine.width, canvasLine.height);
            let dataArray = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(dataArray);
            ctx.beginPath();
            for (let i = 0; i < 200; i++) {
                let value = dataArray[i*6];
                if(value>0){
                    het=2;
                }else {
                    het=0;
                }
                ctx.fillStyle = grd;
                ctx.fillRect(i * 5, 300, 2, -value + 1);
                ctx.fillRect(i * 5, 280-value, 2, het);
                ctx.fillStyle = grd2;
                ctx.fillRect(i * 5, 300, 2, value + 1);
                ctx.fillRect(i * 5, 320+value, 2, het);
            }
            window.musicLineStop= requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    };
    musicCircle=()=>{
        const analyser=this.state.analyser;
        let canvas = document.getElementById('canvas-circle');
        let ctx = canvas.getContext("2d");
        ctx.lineWidth = 2;
        let grd = ctx.createLinearGradient(0, 0, 600, 0);
        grd.addColorStop(0, "#89f7fe");
        grd.addColorStop(1, "#43e97b");


        ctx.lineCap="round";
        ctx.lineWidth=3;
        function render() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let dataArray = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(dataArray);

            for (let i = 100; i < 260; i++) {
                let value ;
                if((dataArray[i]-100)>0){
                    value=dataArray[i]-100;
                }else {
                    value=0;
                }
                ctx.beginPath();
                ctx.strokeStyle = "#89f7fe";
                let value2 = dataArray[i]/5;
                let value3 = dataArray[i]*0.8-100;
                ctx.moveTo(200 * Math.sin(i/25)+300, 200 *Math.cos(i/25)+300);
                ctx.lineTo((value+201) * Math.sin(i/25)+300, (value+201) *Math.cos(i/25)+300);
                ctx.stroke();

                ctx.moveTo(200 * Math.sin(i/25)+300, 200 *Math.cos(i/25)+300);
                ctx.lineTo((value2+201) * Math.sin(i/25)+300, (value2+201) *Math.cos(i/25)+300);
                ctx.stroke();
                ctx.beginPath();
                ctx.strokeStyle = "#ee75e6";
                ctx.moveTo((value3+150) * Math.sin(i/25)+300, (value3+150) *Math.cos(i/25)+300);
                ctx.lineTo((value3+152) * Math.sin(i/25)+300, (value3+152) *Math.cos(i/25)+300);
                ctx.stroke();
            }
            window.musicCircleStop=requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    };
    setCurtTime = () => {
        let audio = this.state.audio;
        let curTime = audio.currentTime;
        let sumtime = audio.duration;
        let currentTime = this.seTtime(curTime);
        let currentLoction = (curTime / sumtime) * 233;
        this.setState({
            currentTime: currentTime,
            currentLoction: currentLoction
        });
    };

    muControl = () => {
        let audio = this.state.audio;
        if (this.state.muplayIcon === '#icon-play') {
            this.setState({
                muplayIcon: '#icon-pause',
                setInterval: setInterval(this.setCurtTime, 1000),
            }, () => {
                audio.play();
            })
        } else {
            this.setState({
                muplayIcon: '#icon-play'
            }, () => {
                audio.pause();
                clearInterval(this.state.setInterval);
            })
        }
    };
    seTtime = (duration) => {
        let t;
        if (duration > -1) {
            let min = Math.floor(duration / 60) % 60;
            let sec = duration % 60;
            t = min + ":";
            if (sec < 10) {
                t += "0";
            }
            t += sec.toFixed(0);
        }
        return t;
    };
    spanonclick = () => {
        let ciInput = document.getElementById('ciInput');
        ciInput.click();
    };

    fileChange = (e) => {
        if (e.target.files[0]) {
            let audio = document.getElementById('audio')
            audio.src = URL.createObjectURL(e.target.files[0]);
            let musicName = e.target.files[0].name.split('.')[0];
            this.setState({
                muName: musicName,
            });
            audio.play();
            this.setState({
                muplayIcon: '#icon-pause',
                setInterval: setInterval(this.setCurtTime, 1000),
                currentTime: 0,
                currentLoction: 0
            }, () => {
                audio.play();
            })
        }
    };
    onProgress = (event) => {
        let audio = this.state.audio;
        clearInterval(this.state.setInterval);
        let e = event || window.event;
        let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        let x = e.pageX || e.clientX + scrollX || 0;
        let ProgressLeft = event.target.getBoundingClientRect().left;
        let width = x - ProgressLeft;
        let sumTime = audio.duration;
        audio.currentTime = ((width / 233) * sumTime).toFixed(2);
        this.setState({
            currentLoction: width,
        });
    };

    musicRight=()=>{
        const voiceFrequency=this.state.voiceFrequency
        const  len=voiceFrequency.length;
        let opacity=voiceFrequency[len-1].opacity;
        let transform=voiceFrequency[len-1].transform;
        for(let i=len-1;i>0;i--){
            voiceFrequency[i].opacity=voiceFrequency[i-1].opacity;
            voiceFrequency[i].transform=voiceFrequency[i-1].transform
        }
        voiceFrequency[0].opacity=opacity;
        voiceFrequency[0].transform=transform;

        this.setState({
            voiceFrequency:voiceFrequency
        })
    };
    musicLeft=()=>{
        const voiceFrequency=this.state.voiceFrequency
        const  len=voiceFrequency.length;

        let opacity=voiceFrequency[0].opacity;
        let transform=voiceFrequency[0].transform;

        for(let i=0;i<len-1;i++){
            voiceFrequency[i].opacity=voiceFrequency[i+1].opacity;
            voiceFrequency[i].transform=voiceFrequency[i+1].transform
        }
        voiceFrequency[len-1].opacity=opacity;
        voiceFrequency[len-1].transform=transform;

        this.setState({
            voiceFrequency:voiceFrequency
        })
    };


    onclick=(item,img)=>{
        if(item<2){
            let times=2-item;
            for(let i=0;i<times;i++){
                this.right();
                this.musicRight();
            }

        }else if(item>2){
            let times=item-2;
            for(let i=0;i<times;i++){
                this.left();
                this.musicLeft();
            }
        }
        this.setState({
            backgroundImage:'url(/public/img/opat/'+img+'.jpg)'
        })

    };
    right=()=>{
        const styleList=this.state.styleList;
        let  len=styleList.length;
        let one=styleList[0].transform;
        let imgSite=styleList[0].site;
        for(let i=0;i<len-1;i++){
            styleList[i].transform=styleList[i+1].transform;
            styleList[i].site=styleList[i+1].site
        }
        styleList[len-1].transform=one;
        styleList[len-1].site=imgSite;

        this.setState({
            styleList:styleList
        })
    };
    left=()=>{
        const styleList=this.state.styleList;
        let  len=styleList.length;
        let one=styleList[len-1].transform;
        let imgSite=styleList[len-1].site;
        for(let i=len-1;i>0;i--){
            styleList[i].transform=styleList[i-1].transform;
            styleList[i].site=styleList[i-1].site
        }
        styleList[0].transform=one;
        styleList[0].site=imgSite;

        this.setState({
            styleList:styleList
        })
    };
    toChat=()=>{
        window.location.href='http://mychat.liazm.com'
    };
    toRcAlert=()=>{
        window.location.href='/#/rcAlert'
    };
    menuControl=()=>{
        if(this.state.menuStatus){
            this.setState({
                menuStatus:false
            })
        }else {
            this.setState({
                menuStatus:true
            })
        }
    };
    render() {
        const {voiceFrequency,styleList,backgroundImage,menuStatus}=this.state;
        return (
            <div className='music-design' style={{backgroundImage:backgroundImage}}>
                <div className='music-contents'>
                    {voiceFrequency.map((item)=>{
                        return(
                            <div key={item.key} className='music-content' style={{opacity : item.opacity,transform: item.transform}}>
                                <canvas id={item.name} width={item.canvasWidth} height="600">
                                    Your browser does not support Canvas tag.
                                </canvas>
                            </div>
                        )
                    })}
                </div>

                <div className="musicBox" style={{position: 'absolute', top: 50, right: 50, width: 360, height: 100, borderRadius: 18, boxShadow: '#111 0 0 20px', backgroundColor: 'rgba(199, 199, 199,0.2)'}}>
                    <div style={{width: 100, height: 100, float: 'left'}}>
                        <div className="muplayIcon" onClick={this.muControl}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref={this.state.muplayIcon}/>
                            </svg>
                        </div>
                    </div>

                    <div style={{width: 233, height: 100, float: 'left'}}>
                        <div style={{height: 60, margin: '20px 0', overflow: 'hidden'}}>
                            <div style={{color: '#fff', fontSize: 20, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{this.state.muName} </div>
                            <div onClick={this.onProgress} style={{position: 'absolute', bottom: 24, height: 10, padding: "4px 0px", width: 233,}}>
                                <div style={{borderRadius: 5, height: 2, width: 233, backgroundColor: "#eee"}}/>
                            </div>
                            <div style={{position: 'absolute', bottom: 36, borderRadius: 5, height: 2, width: this.state.currentLoction, maxWidth: 233, backgroundColor: "#111"}}>
                                <div style={{position: 'absolute', right: 0, height: 6, width: 6, marginTop: -2, borderRadius: 10, backgroundColor: '#fff'}}/>
                            </div>

                        </div>
                        <div style={{position: 'absolute', width: 233, height: 25, bottom: 0}}>
                            <div style={{position: 'absolute', left: 0}}>
                                {this.state.currentTime}
                            </div>
                            <div style={{position: 'absolute', right: 0}}>
                                {this.state.duration}
                            </div>
                        </div>
                    </div>
                    <div style={{width: 20, float: 'left', textAlign: 'center',}}>
                        <span role="button" onClick={this.spanonclick}>
                             <input id="ciInput" type="file" style={{display: 'none'}}
                                    onChange={(e) => this.fileChange(e)}/>
                             <div className="circleIcon">
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref={this.state.circleIcon}/>
                                </svg>
                             </div>
                        </span>
                    </div>
                </div>
                <div className="bar" style={{bottom:menuStatus?0:-125}}>
                    {
                        styleList.map((item) => {
                            return (
                                <img key={item.key}
                                     className="photo"
                                     onClick={()=>this.onclick(item.site,item.backgroundImage)}
                                     src={'/public/img/opat/'+item.backgroundImage+'.jpg'}
                                     style={{transform : item.transform}}
                                />
                            )
                        })
                    }

                </div>
                <div style={{ display: "none"}}>
                    <audio id="audio" controls="controls"  loop="loop" src="/public/music/Fade.mp3"/>
                </div>
            </div>

        );
    }
}

export default App;