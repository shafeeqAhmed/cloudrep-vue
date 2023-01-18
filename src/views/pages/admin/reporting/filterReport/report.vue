<template>
  <div class="contract">
    <div class="upp-header">
      <div class="upp-img">
        <b-img
          class="w-100"
          src="@/assets/images/logo/upp-img.png"
        ></b-img>
      </div>
      <div class="upp-heading">
        <h1>Reporting History</h1>
      </div>
    </div>
    <!--========================================-->
    <!--========================================-->
    <div class="mt-2 reporting_sv">
      <b-row>
        <b-col
          lg="5"
          md="8"
        >
          <div class="d-flex align-items-center">
            <b-form-input
              v-model="report_name"
              placeholder="Report Name"
            ></b-form-input>
            <b-button
              @click="updateFilterReport"
              variant="primary"
              class="ml-1"
              >Update</b-button
            >
          </div>
        </b-col>
      </b-row>
    </div>
    <!--========================================-->
    <!--========================================-->
    <div class="mt-2 reporting_filt">
      <b-row class="align-items-center">
        <b-col md="4">
          <v-select
            :searchable="true"
            placeholder="Select User"
            :options="getUsers"
            label="name"
            :reduce="(list) => list.uuid"
            class="v-sel-sty"
            v-model="selectedUser"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            @input="actionOnFilter"
          ></v-select>
        </b-col>

        <b-col md="4">
          <v-select
            :searchable="false"
            id="timezone"
            v-model="timeZone"
            :options="timeZones"
            label="label"
            :reduce="(list) => list.value"
            class="v-sel-sty"
            placeholder="Select Time Zone"
            @input="actionOnFilter"
          ></v-select>
        </b-col>

        <b-col md="4">
          <date-range-picker
            ref="picker"
            opens="left"
            v-model="dateRange"
            @update="actionOnFilter"
          >
          </date-range-picker>
        </b-col>
      </b-row>
    </div>
    <!--========================================-->
    <!--========================================-->

    <div class="reporting_filters mt-2">
      <div
        class="reporting_filters_tab"
        v-if="isReportingFilter"
      >
        <div
          class="filter_tag"
          v-on:click="shortFilters('campaign')"
        >
          <feather-icon
            icon="FilterIcon"
            class=""
            size="16"
          />Campaign
        </div>
        <div
          class="filter_tag"
          v-on:click="shortFilters('target')"
        >
          <feather-icon
            icon="FilterIcon"
            class=""
            size="16"
          />Target
        </div>
        <div
          class="filter_tag"
          v-on:click="shortFilters('client')"
        >
          <feather-icon
            icon="FilterIcon"
            class=""
            size="16"
          />Client
        </div>
        <div
          class="filter_tag"
          v-on:click="shortFilters('publisher')"
        >
          <feather-icon
            icon="FilterIcon"
            class=""
            size="16"
          />Publisher
        </div>
        <div
          class="filter_tag"
          v-on:click="shortFilters('number')"
        >
          <feather-icon
            icon="FilterIcon"
            class=""
            size="16"
          />Number
        </div>
        <div
          class="filter_tag"
          v-on:click="shortFilters('caller_id')"
        >
          <feather-icon
            icon="FilterIcon"
            class=""
            size="16"
          />Caller ID
        </div>
        <b-button
          variant="primary"
          class="add_filt"
          @click="addFilter()"
          ><feather-icon
            icon="PlusIcon"
            class=""
            size="16"
          />Filter</b-button
        >
      </div>
      <div
        ref="add_filter_box"
        class="add_filter_box"
      >
        <div
          class="mb-1"
          v-for="(rule, parentIndex) in andRule"
          :key="parentIndex"
        >
          <div
            v-if="rule.id != 1"
            class="d-flex align-items-center justify-content-center mt-2 mb-2"
          >
            <hr />
            <p class="ml-1 mr-1 mb-0">AND</p>
            <hr />
          </div>
          <!--And Rule Box-->
          <div class="card p-2 mb-1">
            <div
              class=""
              v-for="(fields, index) in rule.orRule"
              :key="index"
            >
              <div
                v-if="index != 0"
                class="d-flex align-items-center justify-content-center mt-2 mb-2"
              >
                <p>or</p>
              </div>
              <!--OR Rule Box-->

              <div class="filter_box">
                <div class="filter_v_select">
                  <div class="custom_select">
                    <div
                      class="show_Select"
                      @click="customSelect(fields.id)"
                    ></div>

                    <div
                      :ref="'dropdown_inp-' + fields.id"
                      class="dropdown_inp"
                    >
                      <b-form-input
                        @keyup="searchFilter($event, fields.id)"
                        class="custom_select_input"
                        placeholder="Search Filter"
                        :ref="'filter_search_' + fields.id"
                      ></b-form-input>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="10"
                        role="presentation"
                        class=""
                      >
                        <path
                          d="M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z"
                        ></path>
                      </svg>
                    </div>
                    <div
                      :ref="'data_select-' + fields.id"
                      class="data_select"
                    >
                      <span v-if="fields.input.length > 0"
                        >{{ fields.input[0].tab_name }} -
                        {{ fields.input[0].type }} -
                        {{ fields.input[0].child_name }}</span
                      >
                      <feather-icon
                        icon="XIcon"
                        class="cursor-pointer"
                        size="22"
                      />
                    </div>

                    <div
                      :ref="'dropdown_custom-' + fields.id"
                      class="dropdown_custom"
                    >
                      <div class="custom_select_dropdown_menu">
                        <b-tabs
                          pills
                          card
                          vertical
                          content-class="tag_content"
                        >
                          <b-tab
                            title="Recent Search"
                            :ref="`filter_recent_search_${fields.id}`"
                            :active="recentSearchTab == `search-${fields.id}`"
                          >
                            <div class="recentlty_used">
                              <p>Recently Used</p>

                              <div
                                class="recent_tag"
                                v-if="
                                  recentlyUsedFilters.length > 0 &&
                                  recentIndex <= 9
                                "
                                @click="
                                  recentTag(
                                    parentIndex,
                                    index,
                                    recentIndex,
                                    fields.id
                                  )
                                "
                                v-for="(
                                  value, recentIndex
                                ) in recentlyUsedFilters"
                                :key="recentIndex"
                              >
                                {{ value.type }} - {{ value.child_name }}
                              </div>
                              <div v-if="recentlyUsedFilters.length == 0">
                                <br /><span>Not Found</span>
                              </div>
                            </div>
                          </b-tab>

                          <b-tab
                            title="Filters"
                            :ref="`filter_list_${fields.id}`"
                            :active="recentSearchTab == `filter-${fields.id}`"
                          >
                            <div class="filter_tags_drop">
                              <app-collapse>
                                <span
                                  :ref="`filter_search_error_${fields.id}`"
                                  class="text-danger"
                                ></span>
                                <app-collapse-item
                                  v-for="filter in filters"
                                  :title="filter.name"
                                  :key="filter.name"
                                >
                                  <div class="filter_tag">
                                    <div
                                      class="tag_nam"
                                      v-for="filter_ch in filter.filter_Ch"
                                      :key="filter_ch.name"
                                      @click="
                                        addData(
                                          'Filter',
                                          filter.name,
                                          filter_ch.name,
                                          filter_ch.value,
                                          parentIndex,
                                          index,
                                          fields.id
                                        )
                                      "
                                    >
                                      <feather-icon
                                        icon="TagIcon"
                                        class="mr-1"
                                        size="16"
                                      />{{ filter_ch.name }}
                                    </div>
                                  </div>
                                </app-collapse-item>
                              </app-collapse>
                            </div>
                          </b-tab>
                          <!-- <b-tab title="Tags">
                            <div class="filter_tags_drop">
                              <app-collapse>
                                <app-collapse-item
                                  v-for="tag in tags"
                                  :title="tag.name"
                                  :key="tag.name"
                                >
                                  <div class="filter_tag">
                                    <div
                                      class="tag_nam"
                                      v-for="tag_ch in tag.tag_Ch"
                                      :key="tag_ch.name"
                                      @click="
                                        addData('Tag', tag.name, tag_ch.name)
                                      "
                                    >
                                      <feather-icon
                                        icon="TagIcon"
                                        class="mr-1"
                                        size="16"
                                      />{{ tag_ch.name }}
                                    </div>
                                  </div>
                                </app-collapse-item>
                              </app-collapse>
                            </div>
                          </b-tab> -->
                        </b-tabs>
                      </div>
                    </div>
                  </div>
                  <div
                    :ref="'overlay_select-' + fields.id"
                    class="overlay_select"
                    @click="closeSelect(fields.id)"
                  ></div>
                </div>

                <div
                  class="operators-input"
                  v-if="
                    fields.input[0].filter_key == 'recording' ||
                    fields.input[0].filter_key == 'call_status_connected' ||
                    fields.input[0].filter_key == 'duplicate' ||
                    fields.input[0].filter_key == 'call_status_converted'
                  "
                >
                  <v-select
                    placeholder="Operators"
                    label="name"
                    :options="Operators2"
                    :reduce="(list) => list.value"
                    v-model="fields.operator"
                    @input="clearOperatorValue(parentIndex, index)"
                  ></v-select>
                </div>

                <div
                  class="operators-input"
                  v-else
                >
                  <v-select
                    placeholder="Operators"
                    label="name"
                    :options="Operators"
                    :reduce="(list) => list.value"
                    v-model="fields.operator"
                    @input="clearOperatorValue(parentIndex, index)"
                  ></v-select>
                </div>

                <div class="filter_value">
                  <span
                    v-if="
                      fields.operator &&
                      ['equal_single_value', 'not_equal_single_value'].includes(
                        fields.operator
                      ) &&
                      ![
                        'recording',
                        'call_status_connected',
                        'duplicate',
                        'call_status_converted',
                      ].includes(fields.input[0].filter_key)
                    "
                  >
                    <p v-if="fields.input[0].filter_key == 'client_name'">
                      <v-select
                        placeholder="Select Client"
                        label="name"
                        :options="getCampaignReportingRecord.clients"
                        :reduce="(list) => list.uuid"
                        v-model="fields.value"
                      ></v-select>
                    </p>

                    <p v-if="fields.input[0].filter_key == 'client_id'">
                      <v-select
                        placeholder="Select Client ID"
                        label="uuid"
                        :options="getCampaignReportingRecord.clients"
                        :reduce="(list) => list.uuid"
                        v-model="fields.value"
                      ></v-select>
                    </p>

                    <p v-if="fields.input[0].filter_key == 'publisher_name'">
                      <v-select
                        placeholder="Select Publisher"
                        label="name"
                        :options="getCampaignReportingRecord.publishers"
                        :reduce="(list) => list.uuid"
                        v-model="fields.value"
                      ></v-select>
                    </p>

                    <p v-if="fields.input[0].filter_key == 'publisher_id'">
                      <v-select
                        placeholder="Select Publisher ID"
                        label="uuid"
                        :options="getCampaignReportingRecord.publishers"
                        :reduce="(list) => list.uuid"
                        v-model="fields.value"
                      ></v-select>
                    </p>

                    <p v-if="fields.input[0].filter_key == 'campaign_name'">
                      <v-select
                        placeholder="Select Campaign"
                        label="name"
                        :options="getCampaignReportingRecord.campaigns"
                        :reduce="(list) => list.uuid"
                        v-model="fields.value"
                      ></v-select>
                    </p>

                    <p v-if="fields.input[0].filter_key == 'campaign_id'">
                      <v-select
                        placeholder="Select Campaign ID"
                        label="uuid"
                        :options="getCampaignReportingRecord.campaigns"
                        :reduce="(list) => list.uuid"
                        v-model="fields.value"
                      ></v-select>
                    </p>

                    <p v-if="fields.input[0].filter_key == 'target_name'">
                      <v-select
                        placeholder="Select Target"
                        label="name"
                        :options="getCampaignReportingRecord.targets"
                        :reduce="(list) => list.uuid"
                        v-model="fields.value"
                      ></v-select>
                    </p>

                    <p v-if="fields.input[0].filter_key == 'target_id'">
                      <v-select
                        placeholder="Select Target ID"
                        label="uuid"
                        :options="getCampaignReportingRecord.targets"
                        :reduce="(list) => list.uuid"
                        v-model="fields.value"
                      ></v-select>
                    </p>

                    <p v-if="fields.input[0].filter_key == 'target_number'">
                      <v-select
                        placeholder="Select Target Number"
                        label="destination"
                        :options="getCampaignReportingRecord.targets"
                        :reduce="(list) => list.destination"
                        v-model="fields.value"
                      ></v-select>
                    </p>

                    <!-- Calls -->
                    <p v-if="fields.input[0].filter_key == 'caller_id'">
                      <v-select
                        placeholder="Select Caller ID"
                        label="caller_id"
                        :options="getCampaignReportingRecord.caller_ids"
                        :reduce="(list) => list.caller_id"
                        v-model="fields.value"
                      ></v-select>
                    </p>

                    <p v-if="fields.input[0].filter_key == 'dialed'">
                      <v-select
                        placeholder="Select Dialed Number"
                        label="dialed"
                        :options="getCampaignReportingRecord.dialed_numbers"
                        :reduce="(list) => list.dialed"
                        v-model="fields.value"
                      ></v-select>
                    </p>

                    <p v-if="fields.input[0].filter_key == 'duration'">
                      <v-select
                        placeholder="Select Duration"
                        label="duration"
                        :options="getCampaignReportingRecord.call_durations"
                        :reduce="(list) => list.duration"
                        v-model="fields.value"
                      ></v-select>
                    </p>

                    <p v-if="fields.input[0].filter_key == 'time_to_connect'">
                      <v-select
                        placeholder="Select Call Length"
                        label="time_to_connect"
                        :options="getCampaignReportingRecord.time_to_connect"
                        :reduce="(list) => list.time_to_connect"
                        v-model="fields.value"
                      ></v-select>
                    </p>

                    <p v-if="fields.input[0].filter_key == 'time_to_call'">
                      <v-select
                        placeholder="Select Time Call"
                        label="time_to_call"
                        :options="getCampaignReportingRecord.time_to_call"
                        :reduce="(list) => list.time_to_call"
                        v-model="fields.value"
                      ></v-select>
                    </p>

                    <p v-if="fields.input[0].filter_key == 'revenue'">
                      <v-select
                        placeholder="Select Revenue"
                        label="revenue"
                        :options="getCampaignReportingRecord.revenue"
                        :reduce="(list) => list.revenue"
                        v-model="fields.value"
                      ></v-select>
                    </p>

                    <p v-if="fields.input[0].filter_key == 'payout'">
                      <v-select
                        placeholder="Select Payout"
                        label="payout"
                        :options="getCampaignReportingRecord.payout"
                        :reduce="(list) => list.payout"
                        v-model="fields.value"
                      ></v-select>
                    </p>

                    <p v-if="fields.input[0].filter_key == 'profit'">
                      <v-select
                        placeholder="Select Profit"
                        label="profit"
                        :options="getCampaignReportingRecord.profit"
                        :reduce="(list) => list.profit"
                        v-model="fields.value"
                      ></v-select>
                    </p>
                    <!--  -->
                  </span>

                  <span
                    v-else-if="
                      fields.operator &&
                      [
                        'recording',
                        'call_status_connected',
                        'duplicate',
                        'call_status_converted',
                      ].includes(fields.input[0].filter_key)
                    "
                  >
                    <p
                      v-if="
                        fields.input[0].filter_key == 'call_status_converted'
                      "
                    >
                      <v-select
                        placeholder="Select Is Converted"
                        :options="['yes', 'no']"
                        v-model="fields.value"
                      ></v-select>
                    </p>

                    <p v-if="fields.input[0].filter_key == 'recording'">
                      <v-select
                        placeholder="Has Recording"
                        :options="['yes', 'no']"
                        v-model="fields.value"
                      ></v-select>
                    </p>

                    <p
                      v-if="
                        fields.input[0].filter_key == 'call_status_connected'
                      "
                    >
                      <v-select
                        placeholder="Has Connected Calls"
                        :options="['yes', 'no']"
                        v-model="fields.value"
                      ></v-select>
                    </p>

                    <p v-if="fields.input[0].filter_key == 'duplicate'">
                      <v-select
                        placeholder="Is Duplicate"
                        :options="['yes', 'no']"
                        v-model="fields.value"
                      ></v-select>
                    </p>
                  </span>

                  <span v-else>
                    <b-form-input
                      v-model="fields.value"
                      placeholder="Enter Value"
                    ></b-form-input
                  ></span>
                </div>

                <div
                  class="text-right filter_cross"
                  v-if="fields.id != 2"
                >
                  <feather-icon
                    @click="removeFields(rule.id, fields.id)"
                    icon="XIcon"
                    class="cursor-pointer"
                    size="20"
                  />
                </div>
              </div>
              <!--OR Rule Box End-->
            </div>
            <b-row class="align-items-center">
              <b-col
                cols="12"
                class="mt-2"
              >
                <div class="d-flex align-items-center">
                  <b-button
                    variant="primary"
                    @click="addOrRule(rule.id)"
                    >ADD OR RULE</b-button
                  >
                  <b-button
                    variant="primary"
                    class="ml-1"
                    @click="addAndRule"
                    >ADD AND RULE</b-button
                  >
                </div>
              </b-col>
            </b-row>
          </div>
          <!--And Rule Box End-->
        </div>

        <div class="d-flex align-items-center">
          <b-button
            class="green_btn"
            variant="outline-success"
            @click="applyFilter"
            >Apply Updated Filters</b-button
          >
          <b-button
            class="red_btn ml-1"
            variant="outline-danger"
            @click="resetFilter"
            >Clear Filters</b-button
          >
        </div>
      </div>
    </div>
    <!--========================================-->
    <!--========================================-->
    <hr />
    <div class="reporting_template mt-2 pb-4">
      <b-row class="mb-1">
        <b-col cols="12">
          <div class="float-right text-right">
            <b-button
              variant="primary"
              class="mr-1"
              v-b-toggle.timeline_togg.calling_togg.map_togg.summary_togg
              >Expand Tab</b-button
            >
          </div>
        </b-col>
      </b-row>
      <div
        class="rep_collapse_header mb-1"
        v-b-toggle.timeline_togg
      >
        <h2>Timeline</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="10"
          role="presentation"
          class=""
        >
          <path
            d="M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z"
          ></path>
        </svg>
      </div>
      <b-collapse
        id="timeline_togg"
        class="p-1"
        visible
      >
        <calling-timeline />
      </b-collapse>
      <div
        class="rep_collapse_header mb-1"
        v-b-toggle.summary_togg
      >
        <h2>Summary</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="10"
          role="presentation"
          class=""
        >
          <path
            d="M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z"
          ></path>
        </svg>
      </div>
      <b-collapse
        id="summary_togg"
        class="p-1"
        visible
      >
        <div class="d-flex align-items-center justify-content-end mb-1">
          <b-button
            variant="primary"
            @click="exportData"
            >Download CSV</b-button
          >
        </div>
        <Summary />
      </b-collapse>
      <div
        class="rep_collapse_header mb-1"
        v-b-toggle.map_togg
      >
        <h2>Map</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="10"
          role="presentation"
          class=""
        >
          <path
            d="M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z"
          ></path>
        </svg>
      </div>
      <b-collapse
        id="map_togg"
        class="p-1"
        visible
      >
        <calling-map />
      </b-collapse>
      <div
        class="rep_collapse_header mb-1"
        v-b-toggle.calling_togg
      >
        <h2>Calling Details</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="10"
          role="presentation"
          class=""
        >
          <path
            d="M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z"
          ></path>
        </svg>
      </div>
      <b-collapse
        id="calling_togg"
        class="p-1"
        visible
      >
        <div
          class="customize_column_head d-flex align-items-center justify-content-end mb-1"
        >
          <b-button-group>
            <b-button
              variant="primary"
              v-b-toggle.customize_column
              >Customize Column</b-button
            >
            <b-button variant="primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="10"
                role="presentation"
                class=""
              >
                <path
                  d="M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z"
                ></path>
              </svg>
            </b-button>
            <b-button
              variant="primary"
              @click="exportData"
              class="ml-1"
              >Download CSV</b-button
            >
          </b-button-group>
        </div>
        <calling-detail />
      </b-collapse>
      <div
        class="rep_collapse_header mb-1"
        v-b-toggle.grid_togg
      >
        <h2>Grid Data Table</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="10"
          role="presentation"
          class=""
        >
          <path
            d="M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z"
          ></path>
        </svg>
      </div>
      <b-collapse
        id="grid_togg"
        class="p-1"
        visible
      >
        <div
          class="customize_column_head d-flex align-items-center justify-content-end mb-1"
        >
          <b-button-group>
            <b-button
              variant="primary"
              v-b-toggle.custom_grid_table
              >Customize Column</b-button
            >
            <b-button
              variant="primary"
              v-b-modal.table_det
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="10"
                role="presentation"
                class=""
              >
                <path
                  d="M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z"
                ></path>
              </svg>
            </b-button>
            <!-- <b-button variant="primary" @click="exportData">Download CSV</b-button> -->
            <b-button
              variant="primary"
              @click="exportData"
              class="ml-1"
              >Download CSV</b-button
            >
          </b-button-group>
        </div>
        <GridData :exportData="passData" />
      </b-collapse>
      <b-modal
        id="table_det"
        centered
        title="Upload Video"
        ok-only
        ok-title="Close"
        modal-class="modal-cr modal-uv"
        hide-header
        hide-footer
      >
        <div class="reporting_tabs">
          <b-tabs content-class="mt-3">
            <b-tab
              title="Events"
              active
            >
            </b-tab>
            <b-tab title="Record">
              <div class="">
                <div class="records_tb">
                  <div class="record_lef">
                    <p>Name</p>
                  </div>
                  <div class="record_rig">
                    <p>Values</p>
                  </div>
                </div>
                <div class="records_tb">
                  <div class="record_lef">
                    <p>Campaign</p>
                  </div>
                  <div class="record_rig">
                    <p>Values</p>
                  </div>
                </div>
                <div class="records_tb">
                  <div class="record_lef">
                    <p>Publisher</p>
                  </div>
                  <div class="record_rig">
                    <p>Values</p>
                  </div>
                </div>
              </div>
            </b-tab>
            <b-tab title="Tags"> </b-tab>
          </b-tabs>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BImg,
  BFormInput,
  BButton,
  BCollapse,
  BTab,
  BTabs,
  VBToggle,
  BButtonGroup,
} from "bootstrap-vue";
import vSelect from "vue-select";
import userStoreModule from "../store";
import store from "@/store";
import CallingMap from "../chart/callingMap/CallingMap.vue";
import {
  Operators,
  Operators2,
  filters,
  filters2,
  tags,
} from "../chart/data/filterData";
import CallingDetail from "../callDetail/index.vue";
import GridData from "../gridTable/gird.vue";
import Summary from "../summary/index.vue";
import CallingTimeline from "../chart/callingTimeline/CallingTimeline.vue";
import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import exportFromJSON from "export-from-json";
import _ from "lodash";
import { toastAlert } from "@core/mixins/ui/toast";
import navMenuItems from "@/navigation/vertical/admin-items";

export default {
  components: {
    BRow,
    BCol,
    BImg,
    BButton,
    BFormInput,
    vSelect,
    CallingMap,
    CallingDetail,
    CallingTimeline,
    DateRangePicker,
    BCollapse,
    AppCollapse,
    AppCollapseItem,
    BTab,
    BTabs,
    Summary,
    VBToggle,
    GridData,
    BButtonGroup,
  },
  mixins: [toastAlert],

  data() {
    let startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    let endofDay = new Date();
    endofDay.setDate(startOfDay.getDate());
    endofDay.setHours(23, 59, 59, 999);

    return {
      dateRange: { startDate: startOfDay, endDate: endofDay },
      selectedUser: "",
      timeZone: "",
      isReportingFilter: 1,
      Operators,
      Operators2,
      filters,
      filters2,
      recentlyUsedFilters: [],
      newFilters: [],
      tags,
      recentSearchTab: "filter-2",
      filtersTab: "",
      andRule: [
        {
          id: 1,
          type: "andRule",
          orRule: [
            {
              id: 2,
              operation: "",
              input: [
                { tab_name: "", type: "", child_name: "", filter_key: "" },
              ],
              operator: "",
              value: "",
            },
          ],
        },
      ],
      passData: "",
      report_name: "",
      uuid: "",
      navMenuItems,
    };
  },
  directives: {
    "b-toggle": VBToggle,
  },
  mounted() {
    this.$store.dispatch("manageReporting/getAllUsers");
    this.$store.dispatch("manageReporting/getCampaignUsers", { page: "1" });
    this.filterReportRecord();
  },
  computed: {
    getUsers() {
      return this.$store.getters["manageReporting/getUsers"];
    },
    timeZones() {
      return this.$store.getters["app/utcList"];
    },
    getCampaignReportingRecord() {
      return this.$store.getters["manageReporting/getCampaignReportingRecord"];
    },
    summaryData() {
      return this.$store.getters["manageReporting/getSummaryData"];
    },
  },
  watch: {
    immediate: true,
    "$route.query": function () {
      this.filterReportRecord();
    },
  },
  methods: {
    filterReportRecord() {
      if (this.$route.query.report_delete !== undefined) {
        this.$bvModal
          .msgBoxConfirm(`Please confirm that you want to delete this Report`, {
            title: "Please Confirm",
            size: "md",
            okVariant: "primary",
            okTitle: "Yes",
            cancelTitle: "No",
            cancelVariant: "outline-secondary",
            hideHeaderClose: false,
            centered: true,
          })
          .then((value) => {
            if (value) {
              let payload = {
                uuid: this.$route.query.report_delete,
              };
              this.$store.dispatch(
                "manageReporting/deleteFilterReport",
                payload
              );
              this.$store.dispatch("app/updateCampaignFilterReportMenu", {
                menu: this.navMenuItems,
                role: "admin",
              });
              this.$router.push({ name: "reporting-timeline" });
            } else {
              this.$router.push({
                path:
                  "reporting-filter-report?report=" +
                  this.$route.query.report_delete,
              });
            }
          });
      } else {
        const report_uuid = this.$route.query.report;
        this.addFilter();
        setTimeout(() => {
          var report = this.$store.state.app.campaignFilterReports.find(
            (data) => {
              return data.uuid == report_uuid;
            }
          );
          if (report) {
            this.report_name = report?.filter_report_name;
            this.selectedUser = report?.filter_user_uuid;
            this.timeZone = report?.filter_time_zone;
            this.dateRange = report?.filter_date_range;
            this.andRule = JSON.parse(report.custom_filters);
          }
        }, 700);

        setTimeout(() => {
          this.andRule.forEach((element) => {
            element.orRule.forEach((data) => {
              this.showFilterDisplay(data.id);
            });
          });

          let payload2 = [];
          this.andRule.forEach((element) => {
            element.orRule.forEach((data) => {
              payload2.push({
                type: data.input[0].type,
                filter_key: data.input[0].filter_key,
                operator: data.operator,
                filter_value: data.value,
                operation: data.operation,
              });
            });
          });

          const payload = {
            timeZone: this.timeZone,
            uuid: this.selectedUser,
            dateRange: this.dateRange,
            customFilters: payload2,
          };

          this.$store.commit("manageReporting/UPDATE_TIMELINE_FILTER", payload);
        }, 3000);
      }
    },
    clearOperatorValue(parentIndex, index) {
      this.andRule[parentIndex].orRule[index].value = "";
    },
    recentTag(parentIndex, index, recentIndex, childId) {
      const recentFilter = this.recentlyUsedFilters[recentIndex];
      let arr = this.andRule[parentIndex].orRule[index];
      arr.input = [];
      arr.input.push(recentFilter);
      this.showFilterDisplay(arr.id);
      this.closeSelect(childId);
    },
    shortFilters(filterType) {
      var tab_name = "Filter";
      var type = "Name/ID";

      if (filterType == "campaign") {
        var child_name = "Campaign Name";
        var filter_key = "campaign_name";
      } else if (filterType == "target") {
        var child_name = "Target Name";
        var filter_key = "target_name";
      } else if (filterType == "client") {
        var child_name = "Client Name";
        var filter_key = "client_name";
      } else if (filterType == "publisher") {
        var child_name = "Publisher Name";
        var filter_key = "publisher_name";
      } else if (filterType == "number") {
        var child_name = "Target Number";
        var filter_key = "target_number";
      } else if (filterType == "caller_id") {
        var child_name = "Caller ID";
        var filter_key = "caller_id";
      }
      let arr = this.andRule[0].orRule[0];
      arr.input = [];
      arr.input.push({
        tab_name: tab_name,
        type: type,
        child_name: child_name,
        filter_key: filter_key,
      });
      this.showFilterDisplay(arr.id);
      this.addFilter();
      this.isReportingFilter = 0;
    },
    addFilter() {
      this.isReportingFilter = 0;
      this.$refs.add_filter_box.style.display = "block";
    },
    removeFields(parentId, childId) {
      const index = this.andRule.findIndex((menu) => menu.id === parentId);
      const childIndex = this.andRule[index].orRule.findIndex(
        (menu) => menu.id === childId
      );

      this.andRule[index].orRule.splice(childIndex, 1);

      if (this.andRule[index].orRule.length == 0) {
        this.andRule.splice(index, 1);
      }
    },
    addAndRule() {
      this.andRule.push({
        id: this.generateRanNumb(),
        type: "andRule",
        orRule: [
          {
            id: this.generateRanNumb(),
            operation: "and",
            input: [
              {
                tab_name: "",
                type: "",
                child_name: "",
                filter_key: "",
              },
            ],
            operator: "",
            value: "",
          },
        ],
      });
    },
    addOrRule(parentId) {
      const index = this.andRule.findIndex((data) => data.id === parentId);
      this.andRule[index].orRule.push({
        id: this.generateRanNumb(),
        operation: "or",
        input: [
          {
            tab_name: "",
            type: "",
            child_name: "",
            filter_key: "",
          },
        ],
        operator: "",
        value: "",
      });
    },
    generateRanNumb() {
      return Math.floor(Math.random() * 2000) + 20;
    },
    showFilterDisplay(id) {
      this.$refs["dropdown_inp-" + id][0].style.display = "none";
      this.$refs["data_select-" + id][0].style.visibility = "visible";
    },
    customSelect(id) {
      const drop = this.$refs["dropdown_custom-" + id][0];
      const overlay = this.$refs["overlay_select-" + id][0];
      drop.classList.add("show");
      overlay.style.display = "block";

      this.$refs["dropdown_inp-" + id][0].classList.add("input_dex");
      this.$refs["dropdown_inp-" + id][0].style.display = "block";
      this.$refs["filter_search_" + id][0].focus();
    },
    closeSelect(id) {
      const drop = this.$refs["dropdown_custom-" + id][0];
      const overlay = this.$refs["overlay_select-" + id][0];
      drop.classList.remove("show");
      overlay.style.display = "none";
      this.$refs["dropdown_inp-" + id][0].classList.remove("input_dex");
      this.filters = this.filters2;
      this.$refs["filter_search_" + id][0].$refs.input.value = "";
    },
    addData(
      tab_name,
      parent_name,
      child_name,
      child_value = "",
      parentIndex = "",
      index = "",
      childId = ""
    ) {
      this.$refs["dropdown_inp-" + childId][0].style.display = "none";
      this.$refs["data_select-" + childId][0].style.visibility = "visible";

      this.closeSelect(childId);

      let input = this.andRule[parentIndex].orRule[index].input;

      if (input.length == 0) {
        this.andRule[parentIndex].orRule[index].input.push({
          tab_name: tab_name,
          type: parent_name,
          child_name: child_name,
          filter_key: child_value,
        });
      } else {
        this.andRule[parentIndex].orRule[index].input = [];
        this.andRule[parentIndex].orRule[index].input.push({
          tab_name: tab_name,
          type: parent_name,
          child_name: child_name,
          filter_key: child_value,
        });
      }

      const recentIndex = this.recentlyUsedFilters.findIndex(
        (data) => data.child_name == child_name
      );

      if (recentIndex == -1) {
        this.recentlyUsedFilters.push({
          tab_name: tab_name,
          type: parent_name,
          child_name: child_name,
          filter_key: child_value,
        });
      }

      this.recentlyUsedFilters.reverse();
    },
    actionOnFilter() {
      const payload = {
        timeZone: this.timeZone,
        uuid: this.selectedUser,
        dateRange: this.dateRange,
      };

      this.$store.commit(
        "manageReporting/UPDATE_TIMELINE_FILTER_UUID",
        payload
      );
    },
    applyFilter() {
      let payload = [];
      this.andRule.forEach((element) => {
        element.orRule.forEach((data) => {
          payload.push({
            type: data.input[0].type,
            filter_key: data.input[0].filter_key,
            operator: data.operator,
            filter_value: data.value,
            operation: data.operation,
          });
        });
      });

      this.$store.commit(
        "manageReporting/UPDATE_TIMELINE_CUSTOM_FILTER",
        payload
      );
    },
    resetFilter() {
      this.andRule = [
        {
          id: 1,
          type: "andRule",
          orRule: [
            {
              id: 2,
              operation: "",
              input: [
                { tab_name: "", type: "", child_name: "", filter_key: "" },
              ],
              operator: "",
              value: "",
            },
          ],
        },
      ];
      this.$refs.add_filter_box.style.display = "none";
      this.isReportingFilter = 1;
    },
    exportData() {
      this.passData = Math.floor(Math.random() * 2000) + 20;
      // this.exportDataFromJSON(this.summaryData, null, null);
    },
    exportDataFromJSON(data, newFileName, fileExportType) {
      const fileName = newFileName || "exported-data";
      const exportType = exportFromJSON.types[fileExportType || "csv"];
      exportFromJSON({ data, fileName, exportType });
    },
    searchFilter(event, childId) {
      const search = event.target.value;

      this.newFilters = [];
      this.filters = this.filters2;
      this.filters.forEach((parent, parentIndex) => {
        parent.filter_Ch.forEach((child, childIndex) => {
          if (child.name.toLowerCase().search(search.toLowerCase()) != -1) {
            const searchIndex = this.newFilters.findIndex(
              (data) => data.name == parent.name
            );

            if (searchIndex == -1) {
              this.newFilters.push({
                name: parent.name,
                filter_Ch: [{ name: child.name, value: child.value }],
              });
            } else {
              this.newFilters[searchIndex].filter_Ch.push({
                name: child.name,
                value: child.value,
              });
            }
          }
        });
      });

      if (this.newFilters.length == 0) {
        this.filters = [];
        this.recentSearchTab = `search-${childId}`;
      } else {
        this.filters = this.newFilters;
        this.recentSearchTab = `filter-${childId}`;
      }
    },
    updateFilterReport() {
      let payLoad = {
        filter_report_name: this.report_name,
        filter_user_uuid: this.selectedUser,
        filter_time_zone: this.timeZone,
        filter_date_range: this.dateRange,
        custom_filters: JSON.stringify(this.andRule),
        uuid: this.$route.query.report,
      };
      this.$store.dispatch(
        "manageReporting/updateCampaigFilterReport",
        payLoad
      );

      this.successToast(
        "success",
        "Filter Report has been updated successfully."
      );
    },
  },
  created() {
    const APP_STORE_MODULE_NAME = "manageReporting";
    // Register module
    if (!this.$store.hasModule(APP_STORE_MODULE_NAME)) {
      this.$store.registerModule(APP_STORE_MODULE_NAME, userStoreModule);
    }
    this.$store.dispatch("app/getUtcList");
  },
  destroyed() {
    // UnRegister on leave
    const APP_STORE_MODULE_NAME = "manageReporting";
    if (this.$store.hasModule(APP_STORE_MODULE_NAME)) {
      this.$store.unregisterModule(APP_STORE_MODULE_NAME);
    }
  },
};
</script>
