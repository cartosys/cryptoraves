<template>
  <div class="tokensearch">
    <div class="tokensearch-shape">
      <img src="../../assets/img/searchicon.png" >
    </div>
    <SearchBar :tokensearch="true"/>
  </div>
</template>

<script>
import axios from 'axios'
import SearchBar from '../ui/SearchBar'

export default {
  name: 'TokenSearch',
  components: {
    SearchBar
  },
  data() {
    return {
      user: '',
      userList: []
    }
  },
  created() {
    this.getUserList()
    this.$root.$on('changeUser', () => {
      this.user = ''
    })
  },
  methods: {
    getUserList() {
      // cache management
      axios
        .get(
          this.$store.state.WebsiteInterfaceUrl + '?pageType=userListLastUpdated'
        )
        .then(response => {
          // JSON responses are automatically parsed.
          localStorage.setItem(
            'lastUpdated',
            JSON.stringify(response.data.lastUpdated)
          )
        })
        .catch(e => {
          this.errors.push(e)
        })

      this.update = true
      if (localStorage.userListLastUpdated) {
        if (localStorage.lastUpdated == localStorage.userListLastUpdated) {
          this.update = false
        }
      }

      if (this.update) {
        localStorage.setItem('userListLastUpdated', localStorage.lastUpdated)
        axios
          .get(
            this.$store.state.WebsiteInterfaceUrl + '?pageType=searchBar'
          )
          .then(response => {
            // JSON responses are automatically parsed.
            localStorage.setItem(
              'userList',
              JSON.stringify(response.data.userList)
            )
            this.userList = response.data.userList
          })
          .catch(e => {
            this.errors.push(e)
          })
      } else {
        this.userList = JSON.parse(localStorage.getItem('userList'))
      }
    },
    goHistory: function() {
      // `this` inside methods points to the Vue instance
      if (this.userList.includes(this.user)) {
        this.$root.$emit('changeUser', this.user)
        document.getElementById('autoTokenSelect1').blur()

        this.$router.push({
          name: 'HistoryPage',
          query: {
            user: this.user
          }
        })
      } else {
        alert("'" + this.user + "'" + ' not found!')
        this.user = ''
      }
    }
  }
}
</script>

<style scoped>
.tokensearch {
  width: 100%;
  border-width: 1px;
  border-color: rgb(235, 235, 235);
  border-style: solid;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 5px 29px 0px rgba(0, 0, 1, 0.11);
  display: flex;
  transition: all 200ms ease-in;
}

.tokensearch:hover,
.tokensearch:focus-within {
  -webkit-box-shadow: 0px 5px 29px 0px rgba(106, 219, 252, 1);
  -moz-box-shadow: 0px 5px 29px 0px rgba(106, 219, 252, 1);
  box-shadow: 0px 5px 29px 0px rgba(106, 219, 252, 1);
  transition: all 200ms ease-in;
}
.tokensearch-shape {
  border-radius: 5px 0px 0px 5px;
  width: 110px;
  height: 92px;
  position: relative;
  background-color: rgb(2, 49, 124);
  display: flex;
}

.tokensearch-shape:before {
  content: '';
  position: absolute;
  right: -20px;
  bottom: 0;
  width: 0;
  height: 0;
  border-left: 20px solid rgb(2, 49, 124);

  border-bottom: 92px solid transparent;
}

.tokensearch-shape img {
  width: 70px;
  height: 70px;
  margin: auto auto auto 25px;
}
@media only screen and (max-width: 500px) {
  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    white-space: pre-line;
    position: relative;
    top: -10px;
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    white-space: pre-line;
    position: relative;
    top: -10px;
  }
  :-ms-input-placeholder {
    /* IE 10+ */
    white-space: pre-line;
    position: relative;
    top: -10px;
  }
  :-moz-placeholder {
    /* Firefox 18- */
    white-space: pre-line;
    position: relative;
    top: -10px;
  }
  .tokensearch-input {
    width: 55%;
  }
}

@media only screen and (max-width: 375px) {
  .tokensearch-shape {
    width: 66px;
    height: 66px;
  }
  .tokensearch-shape:before {
    border-left: 21px solid rgb(2, 49, 124);
    border-bottom: 66px solid transparent;
  }
  .tokensearch-shape img {
    width: 50px;
    height: 50px;
    margin: auto auto auto 10px;
  }
  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    white-space: pre-line;
    position: relative;
    top: 0px;
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    white-space: pre-line;
    position: relative;
    top: 0px;
  }
  :-ms-input-placeholder {
    /* IE 10+ */
    white-space: pre-line;
    position: relative;
    top: 0px;
  }
  :-moz-placeholder {
    /* Firefox 18- */
    white-space: pre-line;
    position: relative;
    top: 0px;
  }
}
</style>
