import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const googleMapsIcon = L.divIcon({
    className: '',
    html: `
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="48" viewBox="0 0 36 48">
            <!-- Shadow -->
            <ellipse cx="18" cy="46" rx="6" ry="2.5" fill="rgba(0,0,0,0.25)"/>
            <!-- Pin body -->
            <path d="M18 0 C8.06 0 0 8.06 0 18 C0 30 18 48 18 48 C18 48 36 30 36 18 C36 8.06 27.94 0 18 0 Z"
                  fill="#EA4335"/>
            <!-- Inner circle (white ring) -->
            <circle cx="18" cy="18" r="8" fill="#fff"/>
            <!-- Center dot -->
            <circle cx="18" cy="18" r="4" fill="#fff"/>
        </svg>
    `,
    iconSize: [36, 48],
    iconAnchor: [18, 48],
    popupAnchor: [0, -48],
})

export default function MapEmbed({ lat = -7.420903, lng = 112.340271, title = 'Lokasi Acara' }) {
    return (
        <div className='w-full h-60 rounded-lg overflow-hidden shadow-lg mt-4'>
            <MapContainer
                center={[lat, lng]}
                zoom={18}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, lng]} icon={googleMapsIcon}>
                    <Popup>
                        <div className='text-center text-sm font-glacial-indifference'>
                            <p className='font-bold'>{title}</p>
                            <p className='text-xs'>{lat.toFixed(6)}, {lng.toFixed(6)}</p>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}
