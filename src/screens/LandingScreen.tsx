
import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import {Header, VideoCard} from '../components';
import {TVFocusGuideView} from '@amazon-devices/react-native-kepler';
// To swap between data files, change the import below:
import VideoData from '../data/NewVideoTestData.json';
// import VideoData from '../data/TestData.json';

interface IVideo {
  id: string;
  title: string;
  description: string;
  duration: number;
  thumbURL: string;
  imgURL: string;
  videoURL: string;
  categories: Array<string>;
  channel_id: number;
}

const LandingScreen = ({navigation}: any) => {
  const [categoryVideos, setCategoryVideos] = useState<{[key: string]: IVideo[]}>({});

  const getAllVideos = () => {
    // VideoData is directly an array, not wrapped in an object
    // Extract all unique categories from the data
    const categoriesSet = new Set<string>();
    VideoData.forEach((video: IVideo) => {
      if (video.categories && Array.isArray(video.categories)) {
        video.categories.forEach((cat: string) => categoriesSet.add(cat));
      }
    });

    // Group videos by category
    const videosByCategory: {[key: string]: IVideo[]} = {};
    categoriesSet.forEach((category) => {
      videosByCategory[category] = VideoData.filter(
        (video: IVideo) =>
          video.categories && video.categories.includes(category),
      );
    });

    setCategoryVideos(videosByCategory);
  };

  useEffect(() => {
    getAllVideos();
  }, []);

  const categoryKeys = Object.keys(categoryVideos);

  return (
    <>
      <Header />
      {categoryKeys.map((category, index) => (
        <TVFocusGuideView key={category} autoFocus={index === 0}>
          <Text style={styles.categoryTitle}>{category}</Text>
          <FlatList
            style={styles.flatList}
            horizontal
            data={categoryVideos[category]}
            renderItem={({item}) => (
              <View style={styles.itemContainer}>
                <VideoCard
                  title={item.title}
                  description={
                    item.description.split(' ').slice(0, 20).join(' ') + '...'
                  }
                  imgURL={item.imgURL}
                  pressFunction={() =>
                    navigation.navigate('VideoDetailScreen', {video: item})
                  }
                />
              </View>
            )}
          />
        </TVFocusGuideView>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  flatList: {
    padding: 10,
  },
  itemContainer: {
    margin: 10,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 30,
  },
});

export default LandingScreen;

