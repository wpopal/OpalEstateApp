import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text, Button} from 'react-native-elements';
import {withNavigation} from 'react-navigation';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Creators as MainCreators} from '~/store/ducks/main';
import {TabView, SceneMap} from 'react-native-tab-view';

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

class Employer extends React.Component {
  constructor(props) {
    super(props);
  }

  FirstRoute = () => (
    <ScrollView style={[styles.scene]}>
      <View>
        <Text h4>CÁC PHÚC LỢI DÀNH CHO BẠN</Text>
        <Text>Lương thưởng hấp dẫn</Text>
        <Text> BHXH, BHYT, BHTN theo quy định của Luật lao động</Text>
        <Text>Môi trường làm việc chuyên nghiệp, năng động</Text>
      </View>
      <View>
        <Text h4>MÔ TẢ CÔNG VIỆC</Text>
        <Text>Số lượng: 10 người (8 nam và 2 nữ) dưới 30 tuổi</Text>
        <Text>
          - Giám định linh kiện (ngoại quan, kích thước, yêu cầu kỹ thuật,….) và
          cấp chứng nhận cho linh kiện
        </Text>
        <Text>- Quản lý tiến độ cấp giấy chứng nhận linh kiện</Text>
        <Text>- Quản lý việc đúc thử linh kiện</Text>
        <Text> - Chỉ đạo kỹ thuật cho các nhà cung cấp linh kiện</Text>
        <Text> - Kiểm tra khuôn, làm bảng chỉ thị làm nhám bề mặt</Text>
        <Text> - Cải thiện năng suất sản xuất</Text>
        <Text>- Đối ứng với hàng lỗi phát sinh</Text>
        <Text> - Quản lý tiến độ sản xuất các dòng máy mới</Text>
      </View>
      <View>
        <Text h4>YÊU CẦU CÔNG VIỆC</Text>
        <Text>
          - Ứng viên tốt nghiệp từ Đại học trở lên chuyên ngành liên quan đến Cơ
          khí, Cơ điện tử, Vật lý, Hóa học, Vật liệu...
        </Text>
        <Text>
          {' '}
          - Có hiểu biết hoặc kinh nghiệm về Đúc nhựa, Phun nhựa (Injection)
          Khuôn mẫu (Mold), Linh kiện cơ khí (Mechanical parts)
        </Text>
        <Text> - Có khả năng đọc bản vẽ thành thạo</Text>
        <Text>
          {' '}
          - Sử dụng thành thạo CAD, Solidwork,... để mô phỏng hoạt động
        </Text>
        <Text> - Yêu thích hoặc có kinh nghiệm như mô tả công việc</Text>
        <Text> - Ưu tiên sinh viên mới tốt nghiệp</Text>
        <Text> - Sinh sống tại Hải Phòng</Text>
        <Text>* Kỹ năng yêu cầu:</Text>
        <Text>- Nam: Tiếng Anh hoặc Tiếng Nhật văn phòng cơ bản</Text>
        <Text> - Nữ: Tiếng Nhật N2 hoặc tương đương trở lên</Text>
        <Text>
          - Sử dụng thành thạo máy vi tính văn phòng (Excel, word, power point…)
        </Text>
        <Text>- Sử dụng thành thạo CAD, Solidwork</Text>
        <Text>- Giao tiếp tốt</Text>
        <Text>- Thân thiện, hòa đồng</Text>
        <Text>
          - Có khả năng tăng ca, thêm giờ, làm việc qua đêm nếu được yêu cầu
        </Text>
        <Text>- Có thể đi làm ca nếu được yêu cầu (ca sáng, chiều, đêm)</Text>
        <Text>- Có khả năng đi công tác</Text>
        <Text>* Nhận CV Tiếng Anh Hoặc Tiếng Nhật</Text>
      </View>
    </ScrollView>
  );

  SecondRoute = () => (
    <ScrollView style={[styles.scene]}>
      <Text>
        KYOCERA Document Technology Vietnam Company Limited is a 100%
        Japan-invested company, began production on October 1, 2012, as the
        second overseas plant of Kyocera Document Solutions - a member of the
        Kyocera Group.
      </Text>

      <Text>
        In order to realize our Management Rationale — "To provide opportunities
        for the material and intellectual growth of all our employees, and
        through our joint efforts, to contribute to the advancement of society
        and humankind" — the employees are diligently working to become an
        energetic plant that is number one in Vietnam. In addition, Vietnamese
        employees are being dispatched to the R&D Center at the Head Office of
        the Kyocera Document Solutions, so the plant can function as more than
        just a manufacturing base, and have research and development capability.
        We are contributing to the regional development of Vietnam by providing
        a workplace environment where the outstanding people of Vietnam can make
        the most of their capabilities.
      </Text>

      <Text>
        Business Description: Manufacturing of multifunctional products and
        printers
      </Text>
    </ScrollView>
  );

  state = {
    data: [
      {
        avata:
          'https://images.vietnamworks.com/pictureofcompany/86/10762349.png',
        title:
          'Nhân Viên Kỹ Thuật Linh Kiện 部品技術スタッフ Parts Engineering Staff',
        dec:
          'Công Ty TNHH Công Nghệ Máy Văn Phòng Kyocera Việt Nam - Hải Phòng',
      },
      {
        avata:
          'https://images.vietnamworks.com/pictureofcompany/68/10762892.png',
        title: '[VinSmart] Chuyên Viên PLM/ MES (Triển Khai/ Vận Hành)',
        dec:
          'Công Ty Cổ Phần Nghiên Cứu Và Sản Xuất Vinsmart - Thành Viên Của Tập Đoàn Vingroup - Hà Nội',
      },
      {
        avata:
          'https://images.vietnamworks.com/pictureofcompany/74/10836025.png',
        title: '[VinAI] Linux Administrator',
        dec: 'Vintech_Thuộc Tập Đoàn Vingroup - Hà Nội',
      },
      {
        avata:
          'https://images.vietnamworks.com/pictureofcompany/12/9400715.jpg',
        title:
          '(Senior) Supplier Quality Engineer (for Interior, Exterior, Biw, Electrical) - Working in Haiphong (3 positions)',
        dec:
          'Công Ty TNHH Sản Xuất Và Kinh Doanh Vinfast - Thành Viên Của Vingroup - Hà Nội, Hải Dương, Hải Phòng',
      },
      {
        avata:
          'https://images.vietnamworks.com/pictureofcompany/d2/10860207.png',
        title: 'Stock Management Assistant Manager',
        dec: 'Daikin Air Conditioning (Vietnam) Joint Stock Company',
      },
      {
        avata:
          'https://images.vietnamworks.com/pictureofcompany/64/10636499.png',
        title: 'Phó Phòng Phát Triển Kinh Doanh (Kênh Khách Hàng Chuỗi)',
        dec: 'Navigos Group',
      },
      {
        avata:
          'https://images.vietnamworks.com/pictureofcompany/db/10849297.png',
        title: 'Cần Gấp ! 3 Tester Software ( 1 - 3 Năm Kinh Nghiệm )',
        dec: 'Navigos Group - Hồ Chí Minh',
      },
      {
        avata:
          'https://images.vietnamworks.com/pictureofcompany/9e/10228105.jpg',
        title: 'Senior Officer, EHS',
        dec: 'Molex Vietnam Co., Ltd.',
      },
    ],
    index: 0,
    routes: [
      {key: 'page1', title: 'Thông tin'},
      {key: 'page2', title: 'Công ty'},
      {key: 'page3', title: 'Việc khác'},
    ],
  };

  render() {
    const buttons = ['Hello', 'World', 'Buttons'];
    const {selectedIndex} = this.state;
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <View
            style={{
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{height: 50}}
              source={{
                uri:
                  'https://images.vietnamworks.com/pictureofcompany/86/10762349.png',
              }}
            />
            <Text style={{fontWeight: 'bold'}}>
              Nhân Viên Kỹ Thuật Linh Kiện 部品技術スタッフ Parts Engineering
              Staff
            </Text>
            <Text>
              CÔNG TY TNHH CÔNG NGHỆ MÁY VĂN PHÒNG KYOCERA VIỆT NAM - HẢI PHÒNG
            </Text>
            <TouchableOpacity>
              <Text style={{color: '#289bcc', fontWeight: 'bold'}}>
                Đăng nhập để xem mức lương
              </Text>
            </TouchableOpacity>
            <Text>1113 lượt xem - Hết hạn trong 16 ngày</Text>
            <Button buttonStyle={{margin: 20,backgroundColor:'#cc722a'}} title="Nộp Đơn" />
          </View>
          <TabView
            navigationState={this.state}
            renderScene={SceneMap({
              page1: this.FirstRoute,
              page2: this.SecondRoute,
              page3: this.SecondRoute,
            })}
            onIndexChange={index => this.setState({index})}
            initialLayout={{width: Dimensions.get('window').width}}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    homeRequest: state.home,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(MainCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Employer));
