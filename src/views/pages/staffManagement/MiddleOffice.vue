<template>
  <div class="staff-management pb-3">
    <div class="upp-header">
          <div class="upp-img">
              <b-img class="w-100" src="@/assets/images/logo/upp-img.png" ></b-img>
          </div>
          <div class="upp-heading">
              <h1>Middle Office</h1>
          </div>
      </div>
    <b-tabs pills class="tabs-cr mt-3">
      <b-tab
        title="Sales Supervisors"
        :active="tabName == 'sales'"
        @click="updateTab('sales')"
      >
        <b-row class="mt-3">
          <b-col cols="12" class="mb-3">
            <div
              class="
                d-flex
                align-items-center
                justify-content-between
                flex-wrap
              "
            >
              <div class="filter-search">
                <b-form-group class="mb-0">
                  <b-input-group>
                    <div class="input-gradient">
                      <b-form-input
                        id="filterInput"
                        type="search"
                        placeholder="Search..."
                      />
                    </div>
                  </b-input-group>
                </b-form-group>
              </div>
              <div>
                <b-button variant="primary" class="add-u-btn btn-add"
                  >+ Add User</b-button
                >
              </div>
            </div>
          </b-col>
          <b-col lg="3" md="6">
            <b-card class="statistics-card py-1">
              <b-media no-body>
                <b-media-aside class="mr-2">
                  <b-avatar size="50" class="bg-gradient-primary">
                    <feather-icon
                      class="font-medium-5"
                      size="24"
                      icon="UsersIcon"
                    />
                  </b-avatar>
                </b-media-aside>
                <b-media-body class="my-auto">
                  <b-card-text class="font-medium-1 mb-0"> USER </b-card-text>
                  <h4 class="font-weight-bolder font-medium-3 font mb-0">
                    3021
                  </h4>
                </b-media-body>
                <b-media-aside class="mr-2">
                  <b-img
                    class="card-img"
                    src="@/assets/images/dashboard/Graph.png"
                  />
                </b-media-aside>
              </b-media>
            </b-card>
          </b-col>
          <b-col lg="3" md="6">
            <b-card class="statistics-card py-1">
              <b-media no-body>
                <b-media-aside class="mr-2">
                  <b-avatar size="50" class="session-card">
                    <feather-icon
                      class="font-medium-5 text-primary"
                      size="24"
                      icon="BarChart2Icon"
                    />
                  </b-avatar>
                </b-media-aside>
                <b-media-body class="my-auto">
                  <b-card-text class="font-medium-1 mb-0">
                    Sessions
                  </b-card-text>
                  <h4 class="font-weight-bolder font-medium-5 font mb-0">
                    $350.40
                  </h4>
                </b-media-body>
              </b-media>
            </b-card>
          </b-col>
          <b-col lg="3" md="6">
            <b-card class="statistics-card py-1">
              <b-media no-body>
                <b-media-body class="my-auto">
                  <b-card-text class="font-medium-1 mb-0">
                    Avg. session duration
                  </b-card-text>
                  <h4 class="font-weight-bolder font-medium-5 font mb-0">
                    6m 40sec
                  </h4>
                </b-media-body>
                <b-media-aside class="mr-2">
                  <b-img
                    class="bar-chart-img"
                    src="@/assets/images/dashboard/bar-chart.png"
                  />
                </b-media-aside>
              </b-media>
            </b-card>
          </b-col>
          <b-col lg="3" md="6">
            <b-card class="statistics-card py-1 bounce-card">
              <b-media no-body>
                <b-media-body class="my-auto">
                  <b-card-text class="font-medium-1 mb-0">
                    Bounce rate
                  </b-card-text>
                  <h4 class="font-weight-bolder font-medium-5 font mb-0">
                    21.90 %
                  </h4>
                </b-media-body>
                <b-media-aside class="mr-2">
                  <svg
                    width="92"
                    height="44"
                    viewBox="0 0 92 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.5 41.5C2.5 41.5 8.77975 -6.00537 24.5 16C40.2203 38.0054 46.5 36.9946 52.5 20C59.9168 -1.0075 87.258 17.0806 90 2"
                      stroke="url(#paint0_linear_6101_3493)"
                      stroke-width="4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_6101_3493"
                        x1="-1.00002"
                        y1="46.5"
                        x2="71.0778"
                        y2="-16.9144"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="white" stop-opacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </b-media-aside>
              </b-media>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="align-self-stretched">
          <b-col lg="8" md="6" class="mb-2">
            <b-card no-body class="statistics-card h-100">
              <b-card-header>
                <div>
                  <h3>Total Spent</h3>
                  <h2>$682.5</h2>
                </div>
              </b-card-header>

              <!-- chart -->
              <b-card-body>
                <vue-apex-charts
                  type="bar"
                  height="300"
                  :options="salesBar.chartOptions"
                  :series="salesBar.series"
                />
              </b-card-body>
            </b-card>
          </b-col>
          <b-col lg="4" md="6" class="mb-2">
            <b-card no-body class="statistics-card h-100">
              <b-card-header class="d-block">
                <b-row class="align-items-center">
                  <b-col md="6">
                    <h3>Spent this month</h3>
                    <h2>$682.5</h2>
                  </b-col>
                  <b-col md="6" class="text-right">
                    <feather-icon
                      icon="ChevronUpIcon"
                      size="16"
                      class="text-green"
                    />
                    <span class="font-weight-bolder font-medium-1 text-green"
                      >+2.45%</span
                    >
                  </b-col>
                </b-row>
                <b-media no-body class="my-0p5">
                  <b-media-aside class="">
                    <b-avatar size="25" class="bg-green">
                      <feather-icon
                        class="font-medium-1"
                        size="16"
                        icon="CheckIcon"
                      />
                    </b-avatar>
                  </b-media-aside>
                  <b-media-body class="my-auto">
                    <h4
                      class="font-weight-bolder font-medium-1 text-green mb-0"
                    >
                      On track
                    </h4>
                  </b-media-body>
                </b-media>
                <!-- datepicker -->

                <!-- datepicker -->
              </b-card-header>

              <!-- chart -->
              <b-card-body>
                <vue-apex-charts
                  height="200"
                  :options="statisticsOrder.chartOptions"
                  :series="statisticsOrder.series"
                  class="apex-cr-bars"
                />
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
        <div class="mt-3">
          <b-row class="align-items-center">
            <b-col md="6">
              <h2>All Campaign</h2>
            </b-col>
            <b-col md="6" class="text-right">
              <!-- <b-button variant="primary" class="btn-add"> + Add </b-button> -->
            </b-col>
          </b-row>
          <b-table
            responsive
            :per-page="perPage"
            :current-page="currentPage"
            :items="items"
            :fields="fields"
            class="table-cr mt-2"
          >
            <template #cell(full_name)="data">
              <b-avatar :src="data.item.avatar" />
              <span class="ml-1">{{ data.value }}</span>
            </template>

            <template #cell(status)="data">
              <b-badge :variant="status[1][data.value]">
                {{ status[0][data.value] }}
              </b-badge>
            </template>

            <template #cell(actions)="data">
              <b-dropdown
                :items="data.item.actions"
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
                class="drop-with-trash"
              >
                <template v-slot:button-content>
                  <feather-icon
                    icon="MoreVerticalIcon"
                    size="16"
                    class="text-body align-middle mr-25"
                  />
                </template>
                <b-dropdown-item>
                  <feather-icon icon="Edit2Icon" class="mr-50" />
                  <span>Edit</span>
                </b-dropdown-item>
                <b-dropdown-item>
                  <feather-icon icon="TrashIcon" class="mr-50" />
                  <span>Delete</span>
                </b-dropdown-item>
              </b-dropdown>
            </template>
          </b-table>

          <div class="mt-2">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="right"
              size="sm"
              class="my-0"
              hide-goto-end-buttons
            />
          </div>
        </div>
      </b-tab>

      <b-tab
        title="Support Supervisors"
        :active="tabName == 'support'"
        @click="updateTab('support')"
      >
        <b-row class="mt-3">
          <b-col lg="3" md="6">
            <b-card class="statistics-card">
              <b-media no-body>
                <b-media-aside class="mr-2">
                  <b-avatar size="50" class="bg-gradient-primary">
                    <feather-icon
                      class="font-medium-5"
                      size="24"
                      icon="UsersIcon"
                    />
                  </b-avatar>
                </b-media-aside>
                <b-media-body class="my-auto">
                  <b-card-text class="font-medium-1 mb-0">
                    New User
                  </b-card-text>
                  <h4 class="font-weight-bolder font-medium-3 font mb-0">
                    3021
                  </h4>
                </b-media-body>
                <b-media-aside class="mr-2">
                  <b-img
                    class="card-img"
                    src="@/assets/images/dashboard/Graph.png"
                  />
                </b-media-aside>
              </b-media>
            </b-card>
          </b-col>
          <b-col lg="3" md="6">
            <b-card class="statistics-card">
              <b-media no-body>
                <b-media-aside class="mr-2">
                  <b-avatar size="50" class="session-card">
                    <feather-icon
                      class="font-medium-5 text-primary"
                      size="24"
                      icon="BarChart2Icon"
                    />
                  </b-avatar>
                </b-media-aside>
                <b-media-body class="my-auto">
                  <b-card-text class="font-medium-1 mb-0">
                    Revenue
                  </b-card-text>
                  <h4 class="font-weight-bolder font-medium-5 font mb-0">
                    $350.40
                  </h4>
                </b-media-body>
              </b-media>
            </b-card>
          </b-col>
          <b-col lg="3" md="6">
            <b-card class="statistics-card">
              <b-media no-body>
                <b-media-body class="my-auto">
                  <b-card-text class="font-medium-1 mb-0"> Cost </b-card-text>
                  <h4 class="font-weight-bolder font-medium-5 font mb-0">
                    6m 40sec
                  </h4>
                </b-media-body>
                <b-media-aside class="mr-2">
                  <b-img
                    class="bar-chart-img"
                    src="@/assets/images/dashboard/bar-chart.png"
                  />
                </b-media-aside>
              </b-media>
            </b-card>
          </b-col>
          <b-col lg="3" md="6">
            <b-card class="statistics-card">
              <b-media no-body>
                <b-media-body class="my-auto">
                  <b-card-text class="font-medium-1 mb-0"> Profit </b-card-text>
                  <h4 class="font-weight-bolder font-medium-5 font mb-0">
                    21.90 %
                  </h4>
                </b-media-body>
                <b-media-aside class="mr-2">
                  <b-img
                    class="bar-chart-img"
                    src="@/assets/images/dashboard/Chart-sm.svg"
                  />
                </b-media-aside>
              </b-media>
            </b-card>
          </b-col>
        </b-row>

        <b-row class="align-self-stretched">
          <b-col lg="8" md="6" class="mb-2">
            <b-card no-body class="statistics-card h-100">
              <b-card-header>
                <b-card-text
                  class="font-large-1 font-weight-bolder mb-0 active-user-main"
                >
                  <span class="font-small-3 font-weight-normal active-user"
                    >Daily Active User</span
                  >
                  <br />
                  10,900
                </b-card-text>
              </b-card-header>

              <!-- chart -->
              <b-card-body>
                <vue-apex-charts
                  type="bar"
                  height="300"
                  :options="salesBar.chartOptions"
                  :series="salesBar.series"
                />
              </b-card-body>
            </b-card>
          </b-col>
          <b-col lg="4" md="6" class="mb-2">
            <b-card no-body class="statistics-card h-100">
              <b-card-header class="d-block">
                <b-row class="align-items-center">
                  <b-col md="6">
                    <span class="font-small-3 font-weight-normal active-user"
                      >Spent this month</span
                    >
                  </b-col>
                  <b-col md="6" class="text-right">
                    <feather-icon
                      icon="ChevronUpIcon"
                      size="16"
                      class="text-green"
                    />
                    <span class="font-weight-bolder font-medium-1 text-green"
                      >+2.45%</span
                    >
                  </b-col>
                </b-row>

                <b-card-text
                  class="
                    font-large-1 font-weight-bolder
                    mb-0
                    active-user-main
                    my-0p5
                  "
                  >$682.5</b-card-text
                >
                <b-media no-body class="my-0p5">
                  <b-media-aside class="">
                    <b-avatar size="25" class="bg-green">
                      <feather-icon
                        class="font-medium-1"
                        size="16"
                        icon="CheckIcon"
                      />
                    </b-avatar>
                  </b-media-aside>
                  <b-media-body class="my-auto">
                    <h4
                      class="font-weight-bolder font-medium-1 text-green mb-0"
                    >
                      On track
                    </h4>
                  </b-media-body>
                </b-media>
                <!-- datepicker -->

                <!-- datepicker -->
              </b-card-header>

              <!-- chart -->
              <b-card-body>
                <vue-apex-charts
                  height="200"
                  :options="statisticsOrder.chartOptions"
                  :series="statisticsOrder.series"
                  class="apex-cr-bars"
                />
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>

        <div class="card py-3 px-2 statistics-card">
          <b-row class="align-items-center">
            <b-col md="6">
              <h2>All Campaigns</h2>
            </b-col>
            <b-col md="6" class="text-right">
              <b-button variant="primary" class="btn-add"> + Add </b-button>
            </b-col>
          </b-row>
          <b-table
            responsive
            :per-page="perPage"
            :current-page="currentPage"
            :items="items"
            :fields="fields"
            class="table-cr mt-2"
          >
            <template #cell(full_name)="data">
              <b-avatar :src="data.item.avatar" />
              <span class="ml-1">{{ data.value }}</span>
            </template>

            <template #cell(status)="data">
              <b-badge :variant="status[1][data.value]">
                {{ status[0][data.value] }}
              </b-badge>
            </template>

            <template #cell(actions)="data">
              <b-dropdown
                :items="data.item.actions"
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
                class="drop-with-trash"
              >
                <template v-slot:button-content>
                  <feather-icon
                    icon="MoreVerticalIcon"
                    size="16"
                    class="text-body align-middle mr-25"
                  />
                </template>
                <b-dropdown-item>
                  <feather-icon icon="Edit2Icon" class="mr-50" />
                  <span>Edit</span>
                </b-dropdown-item>
                <b-dropdown-item>
                  <feather-icon icon="TrashIcon" class="mr-50" />
                  <span>Delete</span>
                </b-dropdown-item>
              </b-dropdown>
            </template>
          </b-table>

          <div class="mt-2">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="right"
              size="sm"
              class="my-0"
              hide-goto-end-buttons
            />
          </div>
        </div>
      </b-tab>

      <b-tab
        title="Onboarding Supervisors"
        :active="tabName == 'onboarding'"
        @click="updateTab('onboarding')"
      >
        <b-row class="mt-3">
          <b-col lg="3" md="6">
            <b-card class="statistics-card">
              <b-media no-body>
                <b-media-aside class="mr-2">
                  <b-avatar size="50" class="bg-gradient-primary">
                    <feather-icon
                      class="font-medium-5"
                      size="24"
                      icon="UsersIcon"
                    />
                  </b-avatar>
                </b-media-aside>
                <b-media-body class="my-auto">
                  <b-card-text class="font-medium-1 mb-0">
                    New User
                  </b-card-text>
                  <h4 class="font-weight-bolder font-medium-3 font mb-0">
                    3021
                  </h4>
                </b-media-body>
                <b-media-aside class="mr-2">
                  <b-img
                    class="card-img"
                    src="@/assets/images/dashboard/Graph.png"
                  />
                </b-media-aside>
              </b-media>
            </b-card>
          </b-col>
          <b-col lg="3" md="6">
            <b-card class="statistics-card">
              <b-media no-body>
                <b-media-aside class="mr-2">
                  <b-avatar size="50" class="session-card">
                    <feather-icon
                      class="font-medium-5 text-primary"
                      size="24"
                      icon="BarChart2Icon"
                    />
                  </b-avatar>
                </b-media-aside>
                <b-media-body class="my-auto">
                  <b-card-text class="font-medium-1 mb-0">
                    Revenue
                  </b-card-text>
                  <h4 class="font-weight-bolder font-medium-5 font mb-0">
                    $350.40
                  </h4>
                </b-media-body>
              </b-media>
            </b-card>
          </b-col>
          <b-col lg="3" md="6">
            <b-card class="statistics-card">
              <b-media no-body>
                <b-media-body class="my-auto">
                  <b-card-text class="font-medium-1 mb-0"> Cost </b-card-text>
                  <h4 class="font-weight-bolder font-medium-5 font mb-0">
                    6m 40sec
                  </h4>
                </b-media-body>
                <b-media-aside class="mr-2">
                  <b-img
                    class="bar-chart-img"
                    src="@/assets/images/dashboard/bar-chart.png"
                  />
                </b-media-aside>
              </b-media>
            </b-card>
          </b-col>
          <b-col lg="3" md="6">
            <b-card class="statistics-card">
              <b-media no-body>
                <b-media-body class="my-auto">
                  <b-card-text class="font-medium-1 mb-0"> Profit </b-card-text>
                  <h4 class="font-weight-bolder font-medium-5 font mb-0">
                    21.90 %
                  </h4>
                </b-media-body>
                <b-media-aside class="mr-2">
                  <b-img
                    class="bar-chart-img"
                    src="@/assets/images/dashboard/Chart-sm.svg"
                  />
                </b-media-aside>
              </b-media>
            </b-card>
          </b-col>
        </b-row>

        <b-row class="align-self-stretched">
          <b-col lg="8" md="6" class="mb-2">
            <b-card no-body class="statistics-card h-100">
              <b-card-header>
                <b-card-text
                  class="font-large-1 font-weight-bolder mb-0 active-user-main"
                >
                  <span class="font-small-3 font-weight-normal active-user"
                    >Daily Active User</span
                  >
                  <br />
                  10,900
                </b-card-text>
              </b-card-header>

              <!-- chart -->
              <b-card-body>
                <vue-apex-charts
                  type="bar"
                  height="300"
                  :options="salesBar.chartOptions"
                  :series="salesBar.series"
                />
              </b-card-body>
            </b-card>
          </b-col>
          <b-col lg="4" md="6" class="mb-2">
            <b-card no-body class="statistics-card h-100">
              <b-card-header class="d-block">
                <b-row class="align-items-center">
                  <b-col md="6">
                    <span class="font-small-3 font-weight-normal active-user"
                      >Spent this month</span
                    >
                  </b-col>
                  <b-col md="6" class="text-right">
                    <feather-icon
                      icon="ChevronUpIcon"
                      size="16"
                      class="text-green"
                    />
                    <span class="font-weight-bolder font-medium-1 text-green"
                      >+2.45%</span
                    >
                  </b-col>
                </b-row>

                <b-card-text
                  class="
                    font-large-1 font-weight-bolder
                    mb-0
                    active-user-main
                    my-0p5
                  "
                  >$682.5</b-card-text
                >
                <b-media no-body class="my-0p5">
                  <b-media-aside class="">
                    <b-avatar size="25" class="bg-green">
                      <feather-icon
                        class="font-medium-1"
                        size="16"
                        icon="CheckIcon"
                      />
                    </b-avatar>
                  </b-media-aside>
                  <b-media-body class="my-auto">
                    <h4
                      class="font-weight-bolder font-medium-1 text-green mb-0"
                    >
                      On track
                    </h4>
                  </b-media-body>
                </b-media>
                <!-- datepicker -->

                <!-- datepicker -->
              </b-card-header>

              <!-- chart -->
              <b-card-body>
                <vue-apex-charts
                  height="200"
                  :options="statisticsOrder.chartOptions"
                  :series="statisticsOrder.series"
                  class="apex-cr-bars"
                />
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>

        <div class="card py-3 px-2 statistics-card">
          <b-row class="align-items-center">
            <b-col md="6">
              <h2>All Campaigns</h2>
            </b-col>
            <b-col md="6" class="text-right">
              <b-button variant="primary" class="btn-add"> + Add </b-button>
            </b-col>
          </b-row>
          <b-table
            responsive
            :per-page="perPage"
            :current-page="currentPage"
            :items="items"
            :fields="fields"
            class="table-cr mt-2"
          >
            <template #cell(full_name)="data">
              <b-avatar :src="data.item.avatar" />
              <span class="ml-1">{{ data.value }}</span>
            </template>

            <template #cell(status)="data">
              <b-badge :variant="status[1][data.value]">
                {{ status[0][data.value] }}
              </b-badge>
            </template>

            <template #cell(actions)="data">
              <b-dropdown
                :items="data.item.actions"
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
                class="drop-with-trash"
              >
                <template v-slot:button-content>
                  <feather-icon
                    icon="MoreVerticalIcon"
                    size="16"
                    class="text-body align-middle mr-25"
                  />
                </template>
                <b-dropdown-item>
                  <feather-icon icon="Edit2Icon" class="mr-50" />
                  <span>Edit</span>
                </b-dropdown-item>
                <b-dropdown-item>
                  <feather-icon icon="TrashIcon" class="mr-50" />
                  <span>Delete</span>
                </b-dropdown-item>
              </b-dropdown>
            </template>
          </b-table>

          <div class="mt-2">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="right"
              size="sm"
              class="my-0"
              hide-goto-end-buttons
            />
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import {
  BTable,
  BPagination,
  BRow,
  BCol,
  BFormDatepicker,
  BTabs,
  BTab,
  BButton,
  BCardHeader,
  BCardText,
  BCard,
  BCardBody,
  BCardTitle,
  BDropdown,
  BDropdownItem,
  BBadge,
  BAvatar,
  BMediaAside,
  BMediaBody,
  BMedia,
  BImg,
  BFormInput,
  BFormGroup,
  BInputGroup,
} from "bootstrap-vue";
import { $themeColors } from "@themeConfig";
import router from "@/router";
import { ref } from "@vue/composition-api";
const $barColor = "#f3f3f3";
import VueApexCharts from "vue-apexcharts";
import AppBreadcrumb from "@core/layouts/components/AppBreadcrumb.vue";
import flatPickr from "vue-flatpickr-component";

export default {
  components: {
    VueApexCharts,
    BRow,
    BCol,
    BFormDatepicker,
    BTabs,
    BTab,
    BButton,
    BCardHeader,
    BCardText,
    BCard,
    BCardBody,
    BCardTitle,
    BTable,
    BPagination,
    BDropdown,
    BDropdownItem,
    BBadge,
    BAvatar,
    BMediaAside,
    BMediaBody,
    BMedia,
    BImg,
    AppBreadcrumb,
    flatPickr,
    BFormInput,
    BFormGroup,
    BInputGroup,
  },
  data() {
    return {
      selectedDate: null,
      perPage: 5,
      totalRows: 1,
      currentPage: 1,
      tabName: "",
      statisticsOrder: {
        series: [
          {
            name: "2020",
            data: [45, 85, 65, 45, 65, 70, 78],
          },
        ],
        chartOptions: {
          chart: {
            type: "bar",
            stacked: true,
            toolbar: {
              show: false,
            },
          },
          grid: {
            show: false,
            padding: {
              left: 0,
              right: 0,
              top: -15,
              bottom: -15,
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "20%",
              colors: {
                backgroundBarColors: [
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                ],
                backgroundBarRadius: 8,
              },
            },
          },
          legend: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
          colors: [$themeColors.primary],

          xaxis: {
            categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            show: false,
          },
          tooltip: {
            x: {
              show: false,
            },
          },
        },
      },

      salesBar: {
        series: [
          {
            data: [75, 125, 225, 175, 125, 75, 25, 50, 67, 87, 290, 140],
          },
        ],
        chartOptions: {
          chart: {
            // sparkline: { enabled: true },
            toolbar: { show: false },
          },
          grid: {
            show: false,
            padding: {
              left: 0,
              right: 0,
            },
          },
          states: {
            hover: {
              filter: "none",
            },
          },
          colors: [
            "#ebf0f7",
            "#ebf0f7",
            "#C330CB",
            "#ebf0f7",
            "#ebf0f7",
            "#ebf0f7",
          ],
          xaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          plotOptions: {
            bar: {
              columnWidth: "60%",
              distributed: true,
              borderRadius: 22,
              //   endingShape: "rounded",
            },
          },
          tooltip: {
            enabled: true,
          },
          yaxis: {
            show: false,
          },
          legend: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
        },
      },

      fields: [
        { key: "id", label: "ID#", sortable: true },
        { key: "full_name", label: "Full Name", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "phone", label: "Phone", sortable: true },
        { key: "status", label: "Status", sortable: true },
        "actions",
      ],
      items: [
        {
          id: 1,
          avatar: require("@/assets/images/avatars/10-small.png"),
          full_name: "Cameron Richards",
          email: "kocrevy0@thetimes.co.uk",
          phone: "(405) 555-0128",
          status: 2,
          actions: "",
        },
        {
          id: 2,
          avatar: require("@/assets/images/avatars/10-small.png"),
          full_name: "Cameron Richards",
          email: "kocrevy0@thetimes.co.uk",
          phone: "(405) 555-0128",
          status: 2,
          actions: "",
        },
        {
          id: 3,
          avatar: require("@/assets/images/avatars/10-small.png"),
          full_name: "Cameron Richards",
          email: "kocrevy0@thetimes.co.uk",
          phone: "(405) 555-0128",
          status: 2,
          actions: "",
        },
        {
          id: 4,
          avatar: require("@/assets/images/avatars/10-small.png"),
          full_name: "Cameron Richards",
          email: "kocrevy0@thetimes.co.uk",
          phone: "(405) 555-0128",
          status: 4,
          actions: "",
        },
        {
          id: 5,
          avatar: require("@/assets/images/avatars/1-small.png"),
          full_name: "Cameron Richards",
          email: "kocrevy0@thetimes.co.uk",
          phone: "(405) 555-0128",
          status: 2,
          actions: "",
        },
        {
          id: 6,
          avatar: require("@/assets/images/avatars/1-small.png"),
          full_name: "Cameron Richards",
          email: "kocrevy0@thetimes.co.uk",
          phone: "(405) 555-0128",
          status: 2,
          actions: "",
        },
        {
          id: 7,
          avatar: require("@/assets/images/avatars/1-small.png"),
          full_name: "Cameron Richards",
          email: "kocrevy0@thetimes.co.uk",
          phone: "(405) 555-0128",
          status: 2,
          actions: "",
        },
        {
          id: 8,
          avatar: require("@/assets/images/avatars/1-small.png"),
          full_name: "Cameron Richards",
          email: "kocrevy0@thetimes.co.uk",
          phone: "(405) 555-0128",
          status: 2,
          actions: "",
        },
        {
          id: 9,
          avatar: require("@/assets/images/avatars/1-small.png"),
          full_name: "Cameron Richards",
          email: "kocrevy0@thetimes.co.uk",
          phone: "(405) 555-0128",
          status: 2,
          actions: "",
        },
        {
          id: 10,
          avatar: require("@/assets/images/avatars/1-small.png"),
          full_name: "Cameron Richards",
          email: "kocrevy0@thetimes.co.uk",
          phone: "(405) 555-0128",
          status: 2,
          actions: "",
        },
        {
          id: 11,
          avatar: require("@/assets/images/avatars/1-small.png"),
          full_name: "Cameron Richards",
          email: "kocrevy0@thetimes.co.uk",
          phone: "(405) 555-0128",
          status: 2,
          actions: "",
        },
        {
          id: 12,
          avatar: require("@/assets/images/avatars/1-small.png"),
          full_name: "Cameron Richards",
          email: "kocrevy0@thetimes.co.uk",
          phone: "(405) 555-0128",
          status: 2,
          actions: "",
        },
      ],
      status: [
        {
          2: "$767.50",
          4: "$928.41",
        },
        {
          2: "light-success",
          4: "light-warning",
        },
      ],
    };
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
    this.tabName = ref(router.currentRoute.query.type);
    // console.log('tab name', this.tabName)
  },
  setup() {
    const tabName = ref(router.currentRoute.query.type);
    const updateTab = (tab) => {
      const url = `${router.currentRoute.path}?type=${tab}`;
      return router.push(url).catch(() => {});
    };

    return {
      tabName,
      updateTab,
    };
  },
};
</script>

<style>
</style>