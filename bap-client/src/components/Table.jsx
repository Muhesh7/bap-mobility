import {  Badge, Table, Text,  ScrollArea } from '@mantine/core';


export function UsersTable({ data, location }) {
    console.log(data, location);

    function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        if (d<1) {
            d = d * 100;
            return `${d.toFixed(0)}m`;
        }
        return `${d.toFixed(0)}km`;
      }
      
      function deg2rad(deg) {
        return deg * (Math.PI/180)
      }
    const rows = data.map((item) => (
      <tr key={item.contact}>
        <td>
            <Text fz="sm" fw={500}>
              {item.name}
            </Text>
        </td>

        <td>
        <Text fz="sm" c="dimmed">
            {getDistanceFromLatLon(item.lat, item.lng, location.lat, location.lng)}
          </Text>
        </td>
        <td>
        <Badge color='green' size="md">
           <a style={{textDecoration: 'none', color: 'black'}} href={`https://wa.me/${item.contact}?text=https://maps.google.com/?q=${item.lat},${item.lng}  *Pickup Location of Rider from Nama yatri App*`}>Whatsapp</a>
          </Badge>
        </td>
      </tr>
    ));
  
    return (
      <ScrollArea>
        <Table sx={{ minWidth: 360 }} verticalSpacing="md">
          <thead>
            <tr>
              <th style={{textAlign: 'center'}}>Name</th>
              <th style={{textAlign: 'center'}}>Distance</th>
              <th style={{textAlign: 'center'}}>Contact</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
  );
}