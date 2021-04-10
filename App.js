import React, { useState } from 'react'
import { StyleSheet, Text, View ,FlatList,TouchableOpacity ,Image } from 'react-native'
import axios from 'axios'
import PopUpModal from './Components/PopUpModal.js'


const App = () => {
  const x = {
    "wrapperType": "track",
    "kind": "song",
    "artistId": 104063,
    "collectionId": 1440912101,
    "trackId": 1440912105,
    "artistName": "Jackson 5",
    "collectionName": "The Ultimate Collection",
    "trackName": "I Want You Back",
    "collectionCensoredName": "The Ultimate Collection",
    "trackCensoredName": "I Want You Back",
    "artistViewUrl": "https://music.apple.com/us/artist/jackson-5/104063?uo=4",
    "collectionViewUrl": "https://music.apple.com/us/album/i-want-you-back/1440912101?i=1440912105&uo=4",
    "trackViewUrl": "https://music.apple.com/us/album/i-want-you-back/1440912101?i=1440912105&uo=4",
    "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview114/v4/5f/cf/cf/5fcfcf22-a6c8-1e3b-f7bf-c18760ce0d16/mzaf_17343014289017248244.plus.aac.p.m4a",
    "artworkUrl30": "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/4f/6c/79/4f6c79fb-41c0-848b-a890-8021ed614c04/source/30x30bb.jpg",
    "artworkUrl60": "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/4f/6c/79/4f6c79fb-41c0-848b-a890-8021ed614c04/source/60x60bb.jpg",
    "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/4f/6c/79/4f6c79fb-41c0-848b-a890-8021ed614c04/source/100x100bb.jpg",
    "collectionPrice": 10.99,
    "trackPrice": 1.29,
    "releaseDate": "1969-10-07T12:00:00Z",
    "collectionExplicitness": "notExplicit",
    "trackExplicitness": "notExplicit",
    "discCount": 1,
    "discNumber": 1,
    "trackCount": 21,
    "trackNumber": 1,
    "trackTimeMillis": 178933,
    "country": "USA",
    "currency": "USD",
    "primaryGenreName": "Pop",
    "isStreamable": true
}

  const [Data, setData] = useState({})
  const [isModalVisible,setModalVisible] = useState(false)
  const [modalElement,setModalElement] = useState({})

  React.useEffect(() => {
    setModalVisible(false)
    axios.get('https://itunes.apple.com/search?term=Michael+jackson').then(response=>{
      // console.log(response.data.results)
      setData(response.data.results)
    }).catch(error =>{
      console.log(error)
    })
  },[])

  const showModal = (item) =>{
    console.log(item)
    setModalElement(item)
    setModalVisible(true)
  }

  const ModalInnerComponent = () =>{
    const item = modalElement
    return (<View>
      <View style={{justifyContent:"center"}}>
        <View style={{justifyContent:"center",alignItems:"center"}}>
          <Image style={styles.largeLogo} source={{uri: item.artworkUrl60 }}/>
        </View>
        <View style={{marginVertical:16,fontSize:16}}>
          <Text style={{color:"white", marginVertical:8}}>
            {`Collection Name: ${item.collectionName}`}
          </Text>
          <Text style={{color:"white",marginVertical:8}}>
            {`Artist: ${item.artistName}`}
          </Text>
          <Text style={{color:"white",marginVertical:8}}>
            {`Track Name: ${item.trackCensoredName}`}
          </Text>
          <Text style={{color:"white",marginVertical:8}}>
            {`Genre: ${item.primaryGenreName}`}
          </Text>
        </View>
      </View>
    </View>)
  }
  

  const renderItem = (element) =>{
    const item = element.item
    return (
      <TouchableOpacity delayLongPress={5} onLongPress={()=>{showModal(item)}} onPressOut={()=>{setModalVisible(false)}}>
      <View style={{marginVertical:8,marginHorizontal:8,flexDirection:"row"}}>
        <View>
          <Image style={styles.tinyLogo} source={{uri: item.artworkUrl100 }}
        />
        </View>
        <View style={{flex:1,justifyContent:"center",marginHorizontal:8}}>
          <Text style={[styles.textWhite,{fontSize:16}]}>{item.collectionName}</Text>
          <Text style={{color:"grey"}}>{item.trackCount===1?`${item.trackCount} song`:`${item.trackCount} songs`}</Text>
        </View>
      </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
      ListHeaderComponent={<View style={{backgroundColor:"#171f24",borderBottomColor:"white",borderBottomWidth:1}}><Text style={{color:"white",fontSize:50,margin:8}}>Music</Text></View>}
      style={styles.flatListStyle}
      data={Data}
      renderItem={renderItem}
      keyExtractor={(key,index)=> "key_"+index}
      ></FlatList>
      <PopUpModal
        modalVisibility={isModalVisible}
        animationStyle="fade"
        popUpModalInnerComponent = {ModalInnerComponent()}
        closeModal
      />
      
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#121212"
  },
  tinyLogo: {
    width: 80,
    height: 80,
  },textWhite:{
    color:"white"
  },
  largeLogo:{
    width:160,
    height:160,
  }
})
