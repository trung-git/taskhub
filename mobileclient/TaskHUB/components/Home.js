import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Text,
} from 'react-native';
import axios from 'axios';
import { dummyPost } from './dummy';
import Post from './Post';
import dayjs from 'dayjs';
import { API_URL } from '../config/constans';
import { useTranslation } from 'react-i18next';

const MainScreen = () => {
  const [posts, setPosts] = useState([]);
  const [fetchingPost, setFetchingPost] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const { t } = useTranslation();

  const fetchData = async (pageNum) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/post/get-related-post/?pageNum=${pageNum}`
      );
      const responseData = response.data.data;
      if (pageNum == 1) {
        setPosts(responseData);
      } else {
        setPosts([...posts, ...responseData]);
      }
      setRefreshing(false);
      setLoading(false);
      setFetchingPost(false);
      // return responseData;
    } catch (error) {
      console.error('Error fetching data:', error);
      // return [];
    }
  };

  // axios.interceptors.request.use((request) => {
  //   console.log('Starting Request', JSON.stringify(request, null, 2));
  //   return request;
  // });

  // axios.interceptors.response.use((response) => {
  //   console.log('Response:', JSON.stringify(response, null, 2));
  //   return response;
  // });

  useEffect(() => {
    fetchData(pageNum);
  }, [pageNum]);

  useEffect(() => {
    setFetchingPost(true);
    fetchData(1);
  }, []);

  const loadMorePosts = () => {
    if (!refreshing && !loading) {
      setLoading(true);
      setPageNum((prev) => Number(prev) + 1);
    }
  };

  const refreshPosts = () => {
    setRefreshing(true);
    fetchData(1);
    setPageNum(1);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        onScroll={({ nativeEvent }) => {
          const { contentOffset } = nativeEvent;
          if (contentOffset.y < -100 && !refreshing) {
            refreshPosts();
          }
          console.log(
            'layoutMeasurement',
            nativeEvent.layoutMeasurement.height
          );
          const isCloseToBottom =
            nativeEvent.layoutMeasurement.height +
              nativeEvent.contentOffset.y >=
            nativeEvent.contentSize.height - 20;
          if (isCloseToBottom && !loading && !refreshing) {
            loadMorePosts();
          }
        }}
        scrollEventThrottle={400}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshPosts} />
        }
      >
        {posts?.length > 0 &&
          posts.map((item, index) => (
            <Post
              key={index}
              avatar={
                item.user?.image ||
                'https://cdn.iconscout.com/icon/free/png-256/free-user-avatar-contact-portfolio-personal-portrait-profile-5093.png?f=webp'
              }
              name={`${item.user?.lastName} ${item.user?.firstName}`}
              content={item.text}
              time={`${dayjs(item.createdAt).format('HH:mm')} ${dayjs(
                item.createdAt
              ).format('DD-MM-YYYY')}`}
              tag={t(item.taskTag?.langKey)}
              candidate={item?.candidate || []}
              postId={item?._id}
              photo={item?.photos || []}
              closeRegisterAt={item?.closeRegisterAt}
              workLocation={item?.workLocation}
              cityInfo={item?.cityInfo}
              address={item?.address}
              paymentPlan={item?.paymentPlan}
              userId={item?.user?._id}
            />
          ))}
        {posts?.length <= 0 && !fetchingPost && (
          <View>
            <Text> Hiện tại chưa có tìm công việc nào mới </Text>
          </View>
        )}
        {fetchingPost && (
          <View>
            <ActivityIndicator size={50} />
            <Text>
              Đang tải các tìm việc liên quan đến chuyên môn của bạn...{' '}
            </Text>
          </View>
        )}
        {loading && <ActivityIndicator style={styles.loading} />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  loading: {
    marginVertical: 20,
  },
});

export default MainScreen;
