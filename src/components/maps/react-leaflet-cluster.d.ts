
declare module 'react-leaflet-cluster' {
  import { FC, ReactNode } from 'react';
  import L from 'leaflet';
  
  interface MarkerClusterGroupProps {
    children: ReactNode;
    chunkedLoading?: boolean;
    spiderfyOnMaxZoom?: boolean;
    removeOutsideVisibleBounds?: boolean;
    animate?: boolean;
    disableClusteringAtZoom?: number;
    maxClusterRadius?: number;
    iconCreateFunction?: (cluster: L.MarkerCluster) => L.DivIcon;
    zoomToBoundsOnClick?: boolean;
    showCoverageOnHover?: boolean;
    spiderLegPolylineOptions?: L.PolylineOptions;
  }
  
  declare const MarkerClusterGroup: FC<MarkerClusterGroupProps>;
  
  export default MarkerClusterGroup;
}
