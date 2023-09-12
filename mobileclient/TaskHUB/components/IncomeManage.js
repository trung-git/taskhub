import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';
import { schedulePushNotification } from '../hooks/useNotification';
import { API_URL } from '../config/constans';
import axios from 'axios';

const IncomeManage = () => {
  const [balance, setBalance] = useState(0); // Số dư ban đầu
  const [onlineIncome, setOnlineIncome] = useState(0); // Số dư thu nhập online
  const [cashIncome, setCashIncome] = useState(0); // Số dư thu nhập tiền mặt
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [transactionHistory, setTransactionHistory] = useState([
    { type: 'deposit', amount: 100000, timestamp: new Date() },
    { type: 'deposit', amount: 100000, timestamp: new Date() },
    { type: 'withdraw', amount: 50000, timestamp: new Date() },
    { type: 'withdraw', amount: 50000, timestamp: new Date() },
    { type: 'deposit', amount: 100000, timestamp: new Date() },
    { type: 'deposit', amount: 100000, timestamp: new Date() },
    { type: 'withdraw', amount: 50000, timestamp: new Date() },
    { type: 'deposit', amount: 100000, timestamp: new Date() },
    { type: 'deposit', amount: 100000, timestamp: new Date() },
    { type: 'withdraw', amount: 50000, timestamp: new Date() },
    { type: 'deposit', amount: 100000, timestamp: new Date() },
    { type: 'deposit', amount: 100000, timestamp: new Date() },
    { type: 'withdraw', amount: 50000, timestamp: new Date() },
    { type: 'withdraw', amount: 50000, timestamp: new Date() },
    { type: 'deposit', amount: 100000, timestamp: new Date() },
    { type: 'deposit', amount: 100000, timestamp: new Date() },
    { type: 'withdraw', amount: 50000, timestamp: new Date() },
    { type: 'deposit', amount: 100000, timestamp: new Date() },
    { type: 'deposit', amount: 100000, timestamp: new Date() },
    { type: 'withdraw', amount: 50000, timestamp: new Date() },
    // ... Các giao dịch khác
  ]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/v1/wallet`);
      const responseData = response.data;
      console.log('responseDataInCom', responseData);
      setOnlineIncome(responseData?.byWallet);
      setCashIncome(responseData?.byCast);
      setBalance(responseData?.data?.amount);
      setTransactionHistory(
        responseData?.data?.paymentHistory?.map((_item) => {
          return {
            type: _item?.action,
            amount: _item?.amount,
            timestamp: new Date(_item?.createdAt),
          };
        })
      );
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderTransactionItem = ({ item }) => {
    const transactionTypeBackgroundColor =
      item.type === 'deposit' ? '#E8F5E9' : '#FFEBEE';
    const transactionAmountColor =
      item.type === 'deposit' ? '#4CAF50' : '#FF5722';
    return (
      <View
        style={[
          styles.transactionItem,
          {
            backgroundColor: transactionTypeBackgroundColor,
            borderBottomColor: transactionAmountColor,
            borderBottomWidth: 2,
            borderStyle: 'solid',
          },
        ]}
      >
        <View style={{ display: 'flex' }}>
          <Text
            style={[
              styles.transactionAmount,
              { color: transactionAmountColor },
            ]}
          >
            {item.type === 'deposit' ? `+${item.amount}` : `-${item.amount}`}
          </Text>
          <Text style={{ color: 'grey', fontSize: 14, fontWeight: '400' }}>
            {item.type === 'deposit' ? `Nhận tiền từ công việc` : `Rút tiền`}
          </Text>
        </View>
        <Text style={styles.transactionTimestamp}>
          {item.timestamp.toLocaleString('vi-VN')}
        </Text>
      </View>
    );
  };

  const withdrawMoney = () => {
    setErrorText('');
    setWithdrawAmount('');
    setWithdrawModalVisible(true);
  };
  const withdrawAction = async (amount) => {
    const withdrawData = {
      amount: amount,
      action: 'withdraw',
    };
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/wallet`,
        withdrawData
      );
      const responseData = response.data;
      console.log('responseDataInCom', responseData);
      setBalance(responseData?.data?.amount);
      setTransactionHistory(
        responseData?.data?.paymentHistory?.map((_item) => {
          return {
            type: _item?.action,
            amount: _item?.amount,
            timestamp: new Date(_item?.createdAt),
          };
        })
      );
      setWithdrawModalVisible(false);
      setWithdrawAmount('');
      schedulePushNotification(
        '[TaskHUB] - Rút tiền',
        `${amount.toLocaleString('vi-VN')} ₫`
      );
      setErrorText('');
    } catch (error) {
      console.error('Error fetching data:', error);
      // return [];
    }
  };

  const handleWithdraw = () => {
    if (withdrawAmount !== '' && !isNaN(withdrawAmount)) {
      const withdrawalAmount = parseFloat(withdrawAmount);
      if (withdrawalAmount <= balance && withdrawalAmount !== 0) {
        withdrawAction(withdrawAmount);
      } else {
        if (withdrawalAmount === 0) {
          setErrorText('Vui lòng nhập số tiền cần rút');
        } else {
          setErrorText('Số tiền vượt quá số dư');
        }
      }
    } else {
      setErrorText('Vui lòng nhập số tiền hợp lệ');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        onScroll={({ nativeEvent }) => {
          const { contentOffset } = nativeEvent;
          if (contentOffset.y < -100 && !isLoading) {
            fetchData();
          }
        }}
        scrollEventThrottle={400}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
        }
      >
        <View style={styles.card}>
          <Text style={styles.balance}>
            Số dư:{' '}
            {balance.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}
          </Text>
          <TouchableOpacity
            style={styles.withdrawButton}
            onPress={withdrawMoney}
          >
            <Text style={styles.buttonText}>Rút tiền</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.incomeContainer}>
          <View style={styles.incomeItem}>
            <Text style={styles.incomeTitle}>Thu nhập qua Paypal</Text>
            <Text style={styles.incomeAmount}>
              {onlineIncome.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </Text>
          </View>
          <View style={styles.incomeItem}>
            <Text style={styles.incomeTitle}>Thu nhập trực tiếp</Text>
            <Text style={styles.incomeAmount}>
              {cashIncome.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.transactionListContainer}>
        <View>
          <Text>Lịch sử giao dịch</Text>
        </View>
        <FlatList
          data={transactionHistory}
          renderItem={renderTransactionItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.transactionList}
        />
      </View>
      <Modal visible={withdrawModalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Rút tiền</Text>
            <TextInput
              style={[styles.modalInput, errorText ? styles.inputError : null]}
              placeholder="Nhập số tiền cần rút"
              keyboardType="numeric"
              value={withdrawAmount}
              onChangeText={(text) => setWithdrawAmount(text)}
            />
            {errorText ? (
              <Text style={styles.errorText}>{errorText}</Text>
            ) : null}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setWithdrawModalVisible(false)}
              >
                <Text style={styles.buttonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleWithdraw}
              >
                <Text style={styles.buttonText}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 2,
    borderStyle: 'dotted',
    borderColor: '#4CAF50',
  },
  balance: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingVertical: 16,
  },
  withdrawButton: {
    backgroundColor: 'green',
    padding: 16,
    paddingHorizontal: 12,
    width: '40%',
    borderRadius: 4,
    alignItems: 'center',
    marginLeft: 'auto',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  incomeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  incomeItem: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  incomeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  incomeAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 16,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  modalButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 8,
    width: '45%',
  },
  modalButtonCancel: {
    backgroundColor: 'red',
  },
  transactionList: {
    marginTop: 16,
  },
  transactionListContainer: {
    maxHeight: '60%',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  transactionTimestamp: {
    fontSize: 14,
    color: '#555',
  },
});

export default IncomeManage;
