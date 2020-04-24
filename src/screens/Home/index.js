import React from "react";
import './styles.css';
import distance from '../../assets/distance.png';
import wash from '../../assets/wash.png';
import mask from '../../assets/mask.png';

export class Home extends React.Component {
  
  render() {
    return (
      <div className={'home'}>
        <div className={'header'}>
          <div className={'nav'}>
            <div
              className={'menu item'}/>
            <div
              className={'notification item'}/>
          </div>
          <div className={'titleBar'}>
            <h1 className={'title'}>
              Covid-19
            </h1>
          </div>
          <div className={'intro'}>
            <h2>Bạn có cảm thấy không ổn ?</h2>
            <h4>Nếu bạn cảm gặp những triệu chứng của covid-19. Hãy gọi điện vào đường dây nóng của BYT.</h4>
            {/*<h4>If you feel sick with any of covid-19 symptoms please call or SMS us immediately for help.</h4>*/}
            <div className={'buttonRow'}>
              <button className={'button call'} onClick={()=>{
                window.location.href = 'tel:' + 19009095
              }}>
                GỌI NGAY
              </button>
              {/*<button className={'button sms'}>*/}
              {/*  Send SMS*/}
              {/*</button>*/}
            </div>
          </div>
        </div>
        <div className={'sectionPrevention'}>
          <h2>
            Cách phòng bệnh
          </h2>
          <div className={'preventionList'}>
            <div className={'preventionCard'}>
              <div className={'preventionImage'}>
                <img alt={'distance 6ft'} src={distance}/>
              </div>
              <h4>Tránh tiếp xúc trực tiếp</h4>
            </div>
            <div className={'preventionCard'}>
              <div className={'preventionImage'}>
                <img alt={'wash your hand'} src={wash}/>
              </div>
              <h4>Rửa tay với xà phòng thường xuyên</h4>
            </div>
            <div className={'preventionCard'}>
              <div className={'preventionImage'}>
                <img alt={'wearing mask'} src={mask}/>
              </div>
              <h4>Đeo khẩu trang khi ra ngoài</h4>
            </div>
          </div>
        </div>
        <div className={'banner'}>
          <h3>Hãy ở nhà !</h3>
          <h5>Nếu việc ra ngoài không thực sự cần thiết, hãy ở nhà!</h5>
        </div>
        <div className={'bottomBar'} onClick={()=>this.props.history.push('/stats')}/>
      </div>
    )
  }
}

export default Home;