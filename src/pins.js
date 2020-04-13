import * as React from 'react';
import {PureComponent} from 'react';
import {Marker} from 'react-map-gl';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 20;

// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default class Pins extends PureComponent {

  //２点の緯度経度から距離を算出
  GetDistance(lat1, lng1, lat2, lng2) {
    lat1 *= Math.PI / 180;
    lng1 *= Math.PI / 180;
    lat2 *= Math.PI / 180;
    lng2 *= Math.PI / 180;

    let ret = 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));
    return ret;
  }
  
  render() {
    const {data, vp, onClick} = this.props;

    if(data === null)
      return null;

    //表示中の地点（緯度経度）から半径30km以内のデータをピックアップ
    let datas = data.features.filter(x => this.GetDistance(x.geometry.coordinates[1], x.geometry.coordinates[0], vp.latitude, vp.longitude) <= 30);
    //return data.map((city, index) => (
      //<Marker key={`marker-${index}`} longitude={city.lng} latitude={city.lat}></Marker>
    return datas.map((city, index) => (
      <Marker key={`marker-${index}`} longitude={city.geometry.coordinates[0]} latitude={city.geometry.coordinates[1]}>
        <svg
          height={SIZE}
          viewBox="0 0 24 24"
          style={{
            cursor: 'pointer',
            fill: '#d00',
            stroke: 'none',
            transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
          }}
          onClick={() => onClick(city)}
        >
          <path d={ICON} />
        </svg>
      </Marker>
    ));
  }
}
