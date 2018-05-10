import React , { Component } from 'react';
import ViewerTemplate from './components/ViewerTemplate';
import SpaceNavigator from './components/SpaceNavigator';
import Viewer from './components/Viewer';
import moment from 'moment';
import * as api from './lib/api';
class App extends Component {
  
  state = {
    loading : false,
    maxDate : null,
    date : null,
    url: null,
    mediaType: null
  }
  /* Promise 사용
  getAPOD = (date) => {
    api.getAPOD(date)
       .then((response) => {
        console.log(response);
       })
  }
  */


  // async/await 사용
  getAPOD = async (date) =>{
    if(this.state.loading) return; // 이미 요청중이면 무시

    this.setState({
      loading : true
    });


    try{
      const response = await api.getAPOD(date);
      // 비구조화 할당 + 새로운 이름
      const { date: retrieveDate, url, media_type: mediaType} = response.data;
      
      if(!this.state.maxDate) {
        // 만약에 maxDate가 없으면 지금 받은 date로 지정
        this.setState({
          maxDate : retrieveDate
        });
      }
      // 전달 받은 데이터를 넣어주기 
      this.setState({
        date : retrieveDate,
        mediaType,
        url
      })

    } catch(e){
      console.log(e);
    }
    // 로딩상태 종료
    this.setState({
      loading : false
    })
  }

  handlePrev = () => {
    const {date} = this.state;
    const prevDate = moment(date).subtract(1,'days').format('YYYY-MM-DD');
    console.log(prevDate);
    this.getAPOD(prevDate);
  }
  handleNext = () => {
    const {date, maxDate} = this.state;
    if(date === maxDate) return;

    const nextDate = moment(date).add(1, 'days').format('YYYY-MM-DD');
     console.log('nextDate : ' + nextDate);
    this.getAPOD(nextDate);
  }

  componentDidMount() {
    this.getAPOD();
  }

  render() {
    const {url, mediaType, loading} = this.state;
    return (
      <ViewerTemplate 
        spaceNavigator={<SpaceNavigator 
              onPrev={this.handlePrev}
              onNext={this.handleNext}
        />} 
        viewer={(
          < Viewer url={url}
                  mediaType={mediaType}
                  loading={loading} />
        )}
        />
    )
  }
}
export default App;