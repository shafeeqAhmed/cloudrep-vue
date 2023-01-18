<template>
  <div class="tab-pane card offer-card statistics-card active">
    <div class="row">
      <div class="col-1">
        <img class="img-fluid br-6" src="@/assets/images/avatars/2-small.png" />
      </div>
      <div class="col-md-9">
        <h5 class="fw-700 fs-18 clr-black">
          Toyota Insurance Campaign
          <span
            class="bg-F0F0FF clr-navy fs-12 pb_4 pt_4 pe-12 ps-12 ms-12 fw-400"
            >Agents Enrolled <strong>24</strong>
          </span>
        </h5>
        <p class="pt_2 fw-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          gravida tristique orci in integer est. Consequat libero, nibh est
          vitae feugiat auctor. Lorem sapien ut sed.
        </p>
        <div class="row">
          <div class="col-12">
            <span
              class="bg-F0F0FF clr-nero fs-12 pb-6 pt-6 pe-12 ps-12 me-16 fw-400"
            >
              <strong>Category : </strong>Financial Service
            </span>
            <span
              class="bg-F0F0FF clr-nero fs-12 pb-6 pt-6 pe-12 ps-12 me-16 fw-400"
            >
              <strong>Verticals : </strong>Financial Service
            </span>
            <span
              class="bg-F0F0FF clr-nero fs-12 pb-6 pt-6 pe-12 ps-12 me-16 fw-400"
            >
              <strong>Campaign Start Date : </strong>23 July 2022
            </span>
            <span
              class="clr-raven fs-12 fw-400 bb-raven"
            >
              8 More
            </span>
          </div>
        </div>
      </div>
      <div class="col-md-2">
        <button class="btn btn-primary w-100 mb-2 fs-16">Register</button>
        <button class="btn btn-transparent w-100 fs-16">More Details</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.card {
  .card {
    box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%) !important;
  }
}
.offer-card {
  padding: 50px;
  padding-bottom: 40px;
}
</style>
