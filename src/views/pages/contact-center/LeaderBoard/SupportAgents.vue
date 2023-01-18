<template>
  <div>
    <!---=====================-->
    <!---=====================-->
    <div class="contact-center-header mt-1 mb-4">
        <div class="cont-center-heading">
            <h1>Leaderboards</h1>
        </div>
    </div>
    <!---=====================-->
    <!---=====================-->
    <div class="co-center leaderboard-support">
        <div class="leaderboard-sort mb-3">
            <b-row>
                <b-col sm="12">
                    <v-select class="IvrNodeVSelect" :options="options1" placeholder="Month of July"></v-select>
                    <v-select class="IvrNodeVSelect" :options="options2" placeholder="All Teams"></v-select>
                    <v-select class="IvrNodeVSelect" :options="options3" placeholder="All Channels"></v-select>
                </b-col>
            </b-row>
        </div>
        <div class="support-rank pb-5">
            <b-row>
                <b-col cols="6">
                    <div class="rank-1-box">
                        <div class="rank-heading">
                            <h2>Rank 1st</h2>
                        </div>
                        <div class="first-rank">
                            <div class="rank-1-img">
                                <b-img src="@/assets/images/contact-center/rank 1.png"></b-img>
                            </div>
                            <h2 class="mt-1 mb-1">Brooklyn Simmons</h2>
                            <div class="d-flex align-items-center mb-1">
                                <feather-icon icon="StarIcon" size="21"/>
                                <h3>4.23</h3>
                            </div>
                            <h3>423 Reviews</h3>
                        </div>
                    </div>
                </b-col>
                <b-col cols="6">
                    <div class="rank-all-box">
                        <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">Rank</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Reviews</th>
                                <th scope="col">Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2</td>
                                    <td><div class="d-flex align-items-center"><b-img src="@/assets/images/contact-center/rank 1.png"></b-img> Theresa Webb</div></td>
                                    <td>123</td>
                                    <td><div class="d-flex align-items-center"><feather-icon icon="StarIcon" size="21"/>4.23</div></td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td><div class="d-flex align-items-center"><b-img src="@/assets/images/contact-center/rank 1.png"></b-img> Theresa Webb</div></td>
                                    <td>123</td>
                                    <td><div class="d-flex align-items-center"><feather-icon icon="StarIcon" size="21"/>4.23</div></td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td><div class="d-flex align-items-center"><b-img src="@/assets/images/contact-center/rank 1.png"></b-img> Theresa Webb</div></td>
                                    <td>123</td>
                                    <td><div class="d-flex align-items-center"><feather-icon icon="StarIcon" size="21"/>4.23</div></td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td><div class="d-flex align-items-center"><b-img src="@/assets/images/contact-center/rank 1.png"></b-img> Theresa Webb</div></td>
                                    <td>123</td>
                                    <td><div class="d-flex align-items-center"><feather-icon icon="StarIcon" size="21"/>4.23</div></td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td><div class="d-flex align-items-center"><b-img src="@/assets/images/contact-center/rank 1.png"></b-img> Theresa Webb</div></td>
                                    <td>123</td>
                                    <td><div class="d-flex align-items-center"><feather-icon icon="StarIcon" size="21"/>4.23</div></td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td><div class="d-flex align-items-center"><b-img src="@/assets/images/contact-center/rank 1.png"></b-img> Theresa Webb</div></td>
                                    <td>123</td>
                                    <td><div class="d-flex align-items-center"><feather-icon icon="StarIcon" size="21"/>4.23</div></td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td><div class="d-flex align-items-center"><b-img src="@/assets/images/contact-center/rank 1.png"></b-img> Theresa Webb</div></td>
                                    <td>123</td>
                                    <td><div class="d-flex align-items-center"><feather-icon icon="StarIcon" size="21"/>4.23</div></td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td><div class="d-flex align-items-center"><b-img src="@/assets/images/contact-center/rank 1.png"></b-img> Theresa Webb</div></td>
                                    <td>123</td>
                                    <td><div class="d-flex align-items-center"><feather-icon icon="StarIcon" size="21"/>4.23</div></td>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td><div class="d-flex align-items-center"><b-img src="@/assets/images/contact-center/rank 1.png"></b-img> Theresa Webb</div></td>
                                    <td>123</td>
                                    <td><div class="d-flex align-items-center"><feather-icon icon="StarIcon" size="21"/>4.23</div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </b-col>
            </b-row>
        </div>
    </div>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BCard,
  BCardText,
  BLink,
  BFormGroup,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BMedia,
  BAvatar,
  BMediaAside,
  BMediaBody,
  BImg,
  BCardHeader,
  BCardBody,
  BCardTitle,
  BDropdown,
  BDropdownItem,
  BTable,
  BFormCheckbox,
  BBadge,
  BButton,
  BModal,
  BFormTextarea,
  BFormFile,
} from "bootstrap-vue";
import vSelect from "vue-select";
export default {
components: {
    BRow,
    BCol,
    BCard,
    BCardText,
    BLink,
    BFormGroup,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
    BImg,
    BCardHeader,
    BCardBody,
    BCardTitle,
    BDropdown,
    BDropdownItem,
    BTable,
    BFormCheckbox,
    BBadge,
    BButton,
    BModal,
    BFormTextarea,
    BFormFile,
    vSelect,
  },
  data() {
    return {
        options1: [
            "1",
            "2"
        ],
        options2: [
            "1",
            "2",
        ],
        options3: [
            "1",
            "2",
        ],
        
    };
  },
}
</script>

<style>

</style>