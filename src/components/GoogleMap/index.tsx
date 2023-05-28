import { FaMapMarkerAlt } from 'react-icons/fa'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import GoogleMapReact from 'google-map-react'

type PointProps = {
  lat: number
  lng: number
}

const PointComponent = (props: PointProps) => (
  <FaMapMarkerAlt color="red" size={32} />
)

type GoogleMapProp = {
  lat: number
  lng: number
  zoom: number
  visible: boolean
  onClose: () => void
}

export default function GoogleMap({
  lat,
  lng,
  zoom,
  visible,
  onClose
}: GoogleMapProp) {
  if (!visible) return null
  return (
    <>
      <Modal
        isOpen={visible}
        onEsc={() => onClose()}
        onClose={() => onClose()}
        size="6xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Localização de registro</ModalHeader>
          <ModalCloseButton onClick={() => onClose()} />
          <ModalBody>
            <div style={{ height: '80vh', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: process.env.GOOGLE_API_KEY as string
                }}
                defaultCenter={{ lat, lng }}
                center={{ lat, lng }}
                zoom={zoom}
              >
                <PointComponent lat={lat} lng={lng} />
              </GoogleMapReact>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
