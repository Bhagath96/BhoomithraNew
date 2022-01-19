import React, { forwardRef, useEffect } from 'react';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { connect, useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Bar, Pie, Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { makeStyles, Typography, withStyles } from '@material-ui/core';

import { Components, I18n } from '../../../common/components';
const { Grid, CardHeader, CardContent, IconButton, Icon, PickySelect } = Components;

import * as DashboardActions from '../actions';
import { getChartData, getConfig, getCustomerCount, getServiceCount } from '../selectors';
import { STATE_REDUCER_KEY, CHART_IDS, CHART_TITLES, CHART_TYPES, getChartDropdownOption, getI18nDropdown, GROUP_BY, ORDER_BY, getI18nDropdownSelected, DATE_FORMAT } from '../constants';
import { DashboardCard, DashboardCounter } from './DashboardComponents';
import { barConfig, lineConfig, pieConfig, stackedConfig } from '../../../common/components/chart/Config';
import { fetchSurveyTemplates } from '../../dfg/actions';
import { Button } from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';

const useStyles = makeStyles({
  pickyContainer: {
    marginBottom: '10px'
  },
  chartContainer: {
    marginTop: 'auto',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300
  },
  datePicker: {
    backgroundColor: 'white',
    color: 'black !important'
  }
});

const DatePickerButton = withStyles(() => ({
  root: {
    backgroundColor: 'white',
    border: '1px solid grey !important',
    '&:hover': {
      backgroundColor: 'white'
    }
  },
  label: {
    color: 'black',
    '&:hover': {
      color: 'black'
    }
  },
  startIcon: {
    color: 'black'
  }
}))(Button);

function DashboardView(props) {
  // eslint-disable-next-line no-empty-pattern
  const { } = useParams(); // added to fix language translation re-rendering
  const { setChartConfig, loadDashBoard, setCommonFilter, setFilter, resetDashboard } = props;
  const actionDispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    loadDashBoard();
    return () => {
      resetDashboard();
    };
  }, []);

  const { config: {
    [CHART_IDS.CHART_1]: {
      expand: chart1Expand = false,
      type: chart1Type = getChartDropdownOption(CHART_TYPES.LINE_CHART)
    } = {},
    [CHART_IDS.CHART_2]: {
      expand: chart2Expand = false,
      type: chart2Type = getChartDropdownOption(CHART_TYPES.V_BAR_CHART)
    } = {},
    [CHART_IDS.CHART_3]: {
      expand: chart3Expand = false,
      type: chart3Type = getChartDropdownOption(CHART_TYPES.PIE_CHART)
    } = {},
    // [CHART_IDS.CHART_4]: {
    //   expand: chart4Expand = false
    //   // type: chart4Type = getChartDropdownOption(CHART_TYPES.BUBBLE_CHART)
    // } = {}
    [CHART_IDS.CHART_5]: {
      expand: chart5Expand = false,
      type: chart5Type = getChartDropdownOption(CHART_TYPES.V_BAR_CHART)
    } = {},
    [CHART_IDS.CHART_6]: {
      expand: chart6Expand = false,
      type: chart6Type = getChartDropdownOption(CHART_TYPES.V_BAR_CHART)
    } = {},
    [CHART_IDS.CHART_7]: {
      expand: chart7Expand = false,
      type: chart7Type = getChartDropdownOption(CHART_TYPES.V_BAR_CHART)
    } = {}
  } = {},
    chartData: {
      [CHART_IDS.CHART_1]: chart1Data,
      [CHART_IDS.CHART_2]: chart2Data,
      [CHART_IDS.CHART_3]: chart3Data,
      // [CHART_IDS.CHART_4]: chart4Data,
      [CHART_IDS.CHART_5]: chart5Data,
      [CHART_IDS.CHART_6]: chart6Data,
      [CHART_IDS.CHART_7]: chart7Data
    } = {},
    serviceCount: { data: { total: serviceTotal = 0, executed: serviceExecuted = 0 } = {} } = {},
    customerCount: { data: { total: customerTotal = 0, planEnabled: customerEnabledPlan = 0 } = {} } = {},
    filters: {
      common: {
        startDate,
        endDate
      },
      [CHART_IDS.CHART_1]: {
        groupBy: chart1GroupBy,
        sortWithLimit: chart1OrderBy
      } = {},
      [CHART_IDS.CHART_2]: {
        groupBy: chart2GroupBy,
        sortWithLimit: chart2OrderBy
      } = {},
      [CHART_IDS.CHART_3]: {
        groupBy: chart3GroupBy,
        sortWithLimit: chart3OrderBy
      } = {},
      [CHART_IDS.CHART_5]: {
        groupBy: chart5GroupBy,
        sortWithLimit: chart5OrderBy
      } = {},
      [CHART_IDS.CHART_6]: {
        sortWithLimit: chart6OrderBy
      } = {},
      [CHART_IDS.CHART_7]: {
        sortWithLimit: chart7OrderBy
      } = {}
    }
  } = useSelector(state => state[STATE_REDUCER_KEY]);

  const CustomDatePicker = forwardRef(({ value, onClick }, ref) => (
    <DatePickerButton startIcon={<DateRangeIcon style={{ color: 'black' }} />} disableElevation variant="contained" onClick={onClick} ref={ref}>
      {value}
    </DatePickerButton>
  ));

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs style={{ textAlign: 'start' }}>
          <DatePicker
            selectsRange
            selected={new Date()}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setCommonFilter({ startDate: update[0], endDate: update[1] });
              if (update[1]) {
                loadDashBoard();
              }
            }}
            dateFormat={DATE_FORMAT}
            customInput={<CustomDatePicker />}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginBottom: '8px' }}>
        <Grid item lg={4} sm={6} xs={12} >
          <DashboardCounter title={I18n.t('customers')} subtitle='' icon='mdi-account-multiple'
            content={[{ key: I18n.t('total'), value: customerTotal }, { key: I18n.t('plan_enabled'), value: customerEnabledPlan }]} />
        </Grid>
        <Grid item lg={4} sm={6} xs={12} >
          <DashboardCounter color='color-info' title={I18n.t('services')} icon='mdi-tools'
            content={[{ key: I18n.t('total'), value: serviceTotal }, { key: I18n.t('executed'), value: serviceExecuted }]} />
        </Grid>
        <Grid item lg={4} sm={6} xs={12} >
          <DashboardCounter color='color-warning' title={I18n.t('payments')} icon='mdi-currency-inr'
            content={[{ key: I18n.t('total'), value: '' }, { key: 'MRR', value: '' }]} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={chart1Expand ? 12 : 6} lg={chart1Expand ? 12 : 6} >
          <DashboardCard >
            <CardHeader
              action={
                <IconButton aria-label="settings" onClick={() => setChartConfig({ chart: CHART_IDS.CHART_1, expand: !chart1Expand })}>
                  <Icon className="mdi mdi-arrow-expand" />
                </IconButton>
              }
              title={<Typography align='center' style={{ fontWeight: 'bold', margin: '5px 5px 10px 5px' }} variant='h5'>
                {I18n.t(CHART_TITLES[CHART_IDS.CHART_1])}
              </Typography>}
            />
            <CardContent>
              <Grid container justifyContent="space-between">
                <Grid container justifyContent="space-between" className={classes.pickyContainer} >
                  <Grid item xs={3}>
                    <PickySelect
                      id="picky-dashboard"
                      options={[
                        getChartDropdownOption(CHART_TYPES.LINE_CHART),
                        getChartDropdownOption(CHART_TYPES.V_BAR_CHART),
                        getChartDropdownOption(CHART_TYPES.V_STACKED_BAR)
                      ]}
                      value={getChartDropdownOption(chart1Type.id)}
                      includeFilter={true}
                      onChange={values => setChartConfig({ chart: CHART_IDS.CHART_1, type: values })}
                      dropdownHeight={600}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <PickySelect
                      id="picky-dashboard"
                      options={getI18nDropdown(GROUP_BY)}
                      value={getI18nDropdownSelected(GROUP_BY, chart1GroupBy.id || null)}
                      includeFilter={false}
                      onChange={value => {
                        setFilter({ chart: CHART_IDS.CHART_1, filter: { groupBy: value } });
                        actionDispatch(DashboardActions.getTotalAndPlanEnabledCustomers({ chart: CHART_IDS.CHART_1 }));
                      }}
                      dropdownHeight={600}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <PickySelect
                      id="picky-dashboard"
                      options={getI18nDropdown(ORDER_BY)}
                      value={getI18nDropdownSelected(ORDER_BY, chart1OrderBy.id || null)}
                      includeFilter={false}
                      onChange={value => {
                        setFilter({ chart: CHART_IDS.CHART_1, filter: { sortWithLimit: value } });
                        actionDispatch(DashboardActions.getTotalAndPlanEnabledCustomers({ chart: CHART_IDS.CHART_1 }));
                      }}
                      dropdownHeight={600}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.chartContainer}>
                  {chart1Type.id === CHART_TYPES.LINE_CHART ? <Line data={chart1Data}
                    options={
                      {
                        ...lineConfig,
                        scales: {
                          yAxes: {
                            title: {
                              display: true,
                              text: I18n.t('count')
                            }
                          }
                        }
                      }
                    } /> : chart1Type.id === CHART_TYPES.V_BAR_CHART ? <Bar data={chart1Data} options={
                      {
                        ...barConfig,
                        scales: {
                          yAxes: {
                            title: {
                              display: true,
                              text: I18n.t('count')
                            }
                          }
                        }
                      }
                    } /> : <Bar data={chart1Data} options={
                      {
                        ...barConfig,
                        scales: {
                          yAxes: {
                            stacked: true,
                            title: {
                              display: true,
                              text: I18n.t('count')
                            }
                          },
                          xAxes: {
                            stacked: true
                          }
                        }
                      }
                    } />
                  }
                </Grid>
              </Grid>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Chart 2 */}
        <Grid item xs={12} sm={chart2Expand ? 12 : 6} lg={chart2Expand ? 12 : 6} >
          <DashboardCard>
            <CardHeader
              action={
                <IconButton aria-label="settings" onClick={() => setChartConfig({ chart: CHART_IDS.CHART_2, expand: !chart2Expand })}>
                  <Icon className="mdi mdi-arrow-expand" />
                </IconButton>
              }
              title={<Typography align='center' style={{ fontWeight: 'bold' }} variant='h5'>
                {I18n.t(CHART_TITLES[CHART_IDS.CHART_2])}
              </Typography>}
            />
            <CardContent>
              <Grid container justifyContent='space-between'>
                <Grid container justifyContent="space-between" className={classes.pickyContainer} >
                  <Grid item xs={3}>
                    <PickySelect
                      id="picky-dashboard"
                      options={[
                        getChartDropdownOption(CHART_TYPES.LINE_CHART),
                        getChartDropdownOption(CHART_TYPES.V_BAR_CHART),
                        getChartDropdownOption(CHART_TYPES.V_STACKED_BAR)
                      ]}
                      value={getChartDropdownOption(chart2Type.id)}
                      includeFilter={true}
                      onChange={values => setChartConfig({ chart: CHART_IDS.CHART_2, type: values })}
                      dropdownHeight={600}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <PickySelect
                      id="picky-dashboard"
                      options={getI18nDropdown(GROUP_BY)}
                      value={getI18nDropdownSelected(GROUP_BY, chart2GroupBy.id || null)}
                      includeFilter={false}
                      onChange={value => {
                        setFilter({ chart: CHART_IDS.CHART_2, filter: { groupBy: value } });
                        actionDispatch(DashboardActions.getServiceCreatedAndRegistered({ chart: CHART_IDS.CHART_2 }));
                      }}
                      dropdownHeight={600}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <PickySelect
                      id="picky-dashboard"
                      options={getI18nDropdown(ORDER_BY)}
                      value={getI18nDropdownSelected(ORDER_BY, chart2OrderBy.id || null)}
                      includeFilter={false}
                      onChange={value => {
                        setFilter({ chart: CHART_IDS.CHART_2, filter: { sortWithLimit: value } });
                        actionDispatch(DashboardActions.getServiceCreatedAndRegistered({ chart: CHART_IDS.CHART_2 }));
                      }}
                      dropdownHeight={600}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.chartContainer}>
                  {chart2Type.id === CHART_TYPES.LINE_CHART ? <Line data={chart2Data}
                    options={
                      {
                        ...lineConfig,
                        scales: {
                          yAxes: {
                            title: {
                              display: true,
                              text: I18n.t('count')
                            }
                          }
                        }
                      }
                    } /> : chart2Type.id === CHART_TYPES.V_BAR_CHART ?
                    <Bar data={chart2Data} options={
                      {
                        ...barConfig,
                        scales: {
                          yAxes: {
                            title: {
                              display: true,
                              text: I18n.t('count')
                            }
                          }
                        }
                      }
                    } /> : <Bar data={chart2Data} options={
                      {
                        ...barConfig,
                        scales: {
                          yAxes: {
                            stacked: true,
                            title: {
                              display: true,
                              text: I18n.t('count')
                            }
                          },
                          xAxes: {
                            stacked: true
                          }
                        }
                      }
                    } />}
                </Grid>
              </Grid>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Chart 3 */}
        <Grid item xs={12} sm={chart3Expand ? 12 : 6} lg={chart3Expand ? 12 : 6} >
          <DashboardCard style={chart3Expand ? {} : {}}>
            <CardHeader
              action={
                <IconButton aria-label="settings" onClick={() => setChartConfig({ chart: CHART_IDS.CHART_3, expand: !chart3Expand })}>
                  <Icon className="mdi mdi-arrow-expand" />
                </IconButton>
              }
              title={<Typography align='center' style={{ fontWeight: 'bold' }} variant='h5'>
                {I18n.t(CHART_TITLES[CHART_IDS.CHART_3])}
              </Typography>}
            />
            <CardContent>
              <Grid container justifyContent='space-between'>
                <Grid container justifyContent="space-between" className={classes.pickyContainer} >
                  <Grid item xs={3}>
                    <PickySelect
                      id="picky-dashboard"
                      options={[
                        getChartDropdownOption(CHART_TYPES.LINE_CHART),
                        getChartDropdownOption(CHART_TYPES.V_BAR_CHART),
                        getChartDropdownOption(CHART_TYPES.V_STACKED_BAR),
                        getChartDropdownOption(CHART_TYPES.PIE_CHART)
                      ]}
                      value={getChartDropdownOption(chart3Type.id)}
                      includeFilter={true}
                      onChange={values => setChartConfig({ chart: CHART_IDS.CHART_3, type: values })}
                      dropdownHeight={200}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <PickySelect
                      id="picky-dashboard"
                      options={getI18nDropdown(GROUP_BY)}
                      value={getI18nDropdownSelected(GROUP_BY, chart3GroupBy.id || null)}
                      includeFilter={false}
                      onChange={value => {
                        setFilter({ chart: CHART_IDS.CHART_3, filter: { groupBy: value } });
                        actionDispatch(DashboardActions.getCustomersRegistered({ chart: CHART_IDS.CHART_3 }));
                      }}
                      dropdownHeight={600}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <PickySelect
                      id="picky-dashboard"
                      options={getI18nDropdown(ORDER_BY)}
                      value={getI18nDropdownSelected(ORDER_BY, chart3OrderBy.id || null)}
                      includeFilter={false}
                      onChange={value => {
                        setFilter({ chart: CHART_IDS.CHART_3, filter: { sortWithLimit: value } });
                        actionDispatch(DashboardActions.getCustomersRegistered({ chart: CHART_IDS.CHART_3 }));
                      }}
                      dropdownHeight={600}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.chartContainer}>
                  {chart3Type.id === CHART_TYPES.LINE_CHART ? <Line data={chart3Data}
                    options={
                      {
                        ...lineConfig,
                        scales: {
                          yAxes: {
                            title: {
                              display: true,
                              text: I18n.t('count')
                            }
                          }
                        }
                      }
                    } /> : chart3Type.id === CHART_TYPES.PIE_CHART ? <Pie data={chart3Data} options={
                      {
                        ...pieConfig,
                        maintainAspectRatio: false
                      }
                    } /> : chart3Type.id === CHART_TYPES.V_STACKED_BAR ? <Bar data={chart3Data} options={
                      {
                        ...stackedConfig,
                        scales: {
                          yAxes: {
                            stacked: true,
                            title: {
                              display: true,
                              text: I18n.t('count')
                            }
                          },
                          xAxes: {
                            stacked: true
                          }
                        }
                      }
                    } /> : <Bar data={chart3Data} options={
                      {
                        ...barConfig,
                        scales: {
                          yAxes: {
                            title: {
                              display: true,
                              text: I18n.t('count')
                            }
                          }
                        }
                      }
                    } />}
                </Grid>
              </Grid>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Chart 4 */}
        {/* <Grid item xs={12} sm={chart4Expand ? 12 : 6} lg={chart4Expand ? 12 : 6} >
          <DashboardCard style={chart4Expand ? {} : { }}>
            <CardHeader
              action={
                <IconButton aria-label="settings" onClick={() => setChartConfig({ chart: CHART_IDS.CHART_4, expand: !chart4Expand })}>
                  <Icon className="mdi mdi-arrow-expand" />
                </IconButton>
              }
              title={<Typography align='center' style={{ fontWeight: 'bold' }} variant='h5'>
                {I18n.t(CHART_TITLES[CHART_IDS.CHART_4])}
              </Typography>}
            />
            <CardContent>
              <BubbleChart data={chart4Data} />
            </CardContent>
          </DashboardCard>
        </Grid> */}

        {/* Chart 5 */}
        <Grid item xs={12} sm={chart5Expand ? 12 : 6} lg={chart5Expand ? 12 : 6} >
          <DashboardCard style={chart5Expand ? {} : {}}>
            <CardHeader
              action={
                <IconButton aria-label="settings" onClick={() => setChartConfig({ chart: CHART_IDS.CHART_5, expand: !chart5Expand })}>
                  <Icon className="mdi mdi-arrow-expand" />
                </IconButton>
              }
              title={<Typography align='center' style={{ fontWeight: 'bold' }} variant='h5'>
                {I18n.t(CHART_TITLES[CHART_IDS.CHART_5])}
              </Typography>}
            />
            <CardContent>
              <Grid container justifyContent='space-between'>
                <Grid container justifyContent="space-between" className={classes.pickyContainer} >
                  <Grid item xs={3}>
                    <PickySelect
                      id="picky-dashboard"
                      options={[
                        getChartDropdownOption(CHART_TYPES.LINE_CHART),
                        getChartDropdownOption(CHART_TYPES.V_BAR_CHART),
                        getChartDropdownOption(CHART_TYPES.V_STACKED_BAR)
                      ]}
                      value={getChartDropdownOption(chart5Type.id)}
                      includeFilter={true}
                      onChange={values => setChartConfig({ chart: CHART_IDS.CHART_5, type: values })}
                      dropdownHeight={600}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <PickySelect
                      id="picky-dashboard"
                      options={getI18nDropdown(GROUP_BY)}
                      value={getI18nDropdownSelected(GROUP_BY, chart5GroupBy.id || null)}
                      includeFilter={false}
                      onChange={value => {
                        setFilter({ chart: CHART_IDS.CHART_5, filter: { groupBy: value } });
                        actionDispatch(DashboardActions.getTotalWastePerCategory({ chart: CHART_IDS.CHART_5 }));
                      }}
                      dropdownHeight={600}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <PickySelect
                      id="picky-dashboard"
                      options={getI18nDropdown(ORDER_BY)}
                      value={getI18nDropdownSelected(ORDER_BY, chart5OrderBy.id || null)}
                      includeFilter={false}
                      onChange={value => {
                        setFilter({ chart: CHART_IDS.CHART_5, filter: { sortWithLimit: value } });
                        actionDispatch(DashboardActions.getTotalWastePerCategory({ chart: CHART_IDS.CHART_5 }));
                      }}
                      dropdownHeight={600}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.chartContainer}>
                  {chart5Type.id === CHART_TYPES.LINE_CHART ? <Line data={chart5Data}
                    options={
                      {
                        ...lineConfig,
                        scales: {
                          yAxes: {
                            title: {
                              display: true,
                              text: `${I18n.t('weight')} (kg)`
                            }
                          }
                        }
                      }
                    } /> : chart5Type.id === CHART_TYPES.V_BAR_CHART ? <Bar data={chart5Data} options={
                      {
                        ...barConfig,
                        scales: {
                          yAxes: {
                            title: {
                              display: true,
                              text: `${I18n.t('weight')} (kg)`
                            }
                          }
                        }
                      }

                    } /> : <Bar data={chart5Data} options={
                      {
                        ...stackedConfig,
                        scales: {
                          yAxes: {
                            stacked: true,
                            title: {
                              display: true,
                              text: `${I18n.t('weight')} (kg)`
                            }
                          },
                          xAxes: {
                            stacked: true
                          }
                        }
                      }
                    } />}
                </Grid>
              </Grid>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Chart 6 */}
        <Grid item xs={12} sm={chart6Expand ? 12 : 6} lg={chart6Expand ? 12 : 6} >
          <DashboardCard>
            <CardHeader
              action={
                <IconButton aria-label="settings" onClick={() => setChartConfig({ chart: CHART_IDS.CHART_6, expand: !chart6Expand })}>
                  <Icon className="mdi mdi-arrow-expand" />
                </IconButton>
              }
              title={<Typography align='center' style={{ fontWeight: 'bold' }} variant='h5'>
                {I18n.t(CHART_TITLES[CHART_IDS.CHART_6])}
              </Typography>}
            />
            <CardContent>
              <Grid container justifyContent='space-between'>
                <Grid container justifyContent="space-between" className={classes.pickyContainer} >
                  <Grid item xs={5}>
                    <PickySelect
                      id="picky-dashboard"
                      options={[
                        getChartDropdownOption(CHART_TYPES.LINE_CHART),
                        getChartDropdownOption(CHART_TYPES.V_BAR_CHART),
                        getChartDropdownOption(CHART_TYPES.V_STACKED_BAR),
                        getChartDropdownOption(CHART_TYPES.PIE_CHART)
                      ]}
                      value={getChartDropdownOption(chart6Type.id)}
                      includeFilter={true}
                      onChange={values => setChartConfig({ chart: CHART_IDS.CHART_6, type: values })}
                      dropdownHeight={600}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <PickySelect
                      id="picky-dashboard"
                      options={getI18nDropdown(ORDER_BY)}
                      value={getI18nDropdownSelected(ORDER_BY, chart6OrderBy.id || null)}
                      includeFilter={false}
                      onChange={value => {
                        setFilter({ chart: CHART_IDS.CHART_6, filter: { sortWithLimit: value } });
                        actionDispatch(DashboardActions.getTimeTakenToService({ chart: CHART_IDS.CHART_6 }));
                      }}
                      dropdownHeight={600}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.chartContainer}>
                  {chart6Type.id === CHART_TYPES.LINE_CHART ? <Line data={chart6Data}
                    options={
                      {
                        ...lineConfig,
                        scales: {
                          yAxes: {
                            title: {
                              display: true,
                              text: I18n.t('minutes')
                            }
                          }
                        }
                      }
                    } /> : chart6Type.id === CHART_TYPES.V_BAR_CHART ? <Bar data={chart6Data} options={
                      {
                        ...barConfig,
                        scales: {
                          yAxes: {
                            title: {
                              display: true,
                              text: I18n.t('minutes')
                            }
                          }
                        }
                      }
                    } /> : chart6Type.id === CHART_TYPES.V_STACKED_BAR ? <Bar data={chart6Data} options={
                      {
                        ...stackedConfig,
                        scales: {
                          yAxes: {
                            stacked: true,
                            title: {
                              display: true,
                              text: I18n.t('minutes')
                            }
                          },
                          xAxes: {
                            stacked: true
                          }
                        }
                      }
                    } /> : <Pie data={chart6Data} options={
                      {
                        ...pieConfig,
                        maintainAspectRatio: false
                      }
                    } />}
                </Grid>
              </Grid>
            </CardContent>
          </DashboardCard>
        </Grid>

        {/* Chart 7 */}
        <Grid item xs={12} sm={chart7Expand ? 12 : 6} lg={chart7Expand ? 12 : 6} >
          <DashboardCard>
            <CardHeader
              action={
                <IconButton aria-label="settings" onClick={() => setChartConfig({ chart: CHART_IDS.CHART_7, expand: !chart7Expand })}>
                  <Icon className="mdi mdi-arrow-expand" />
                </IconButton>
              }
              title={<Typography align='center' style={{ fontWeight: 'bold' }} variant='h5'>
                {I18n.t(CHART_TITLES[CHART_IDS.CHART_7])}
              </Typography>}
            />
            <CardContent>
              <Grid container justifyContent='space-between'>
                <Grid container justifyContent="space-between" className={classes.pickyContainer} >
                  <Grid item xs={5}>
                    <PickySelect
                      id="picky-dashboard"
                      options={[
                        getChartDropdownOption(CHART_TYPES.LINE_CHART),
                        getChartDropdownOption(CHART_TYPES.V_BAR_CHART),
                        getChartDropdownOption(CHART_TYPES.V_STACKED_BAR)
                      ]}
                      value={getChartDropdownOption(chart7Type.id)}
                      includeFilter={true}
                      onChange={values => setChartConfig({ chart: CHART_IDS.CHART_7, type: values })}
                      dropdownHeight={600}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <PickySelect
                      id="picky-dashboard"
                      options={getI18nDropdown(ORDER_BY)}
                      value={getI18nDropdownSelected(ORDER_BY, chart7OrderBy.id || null)}
                      includeFilter={false}
                      onChange={value => {
                        setFilter({ chart: CHART_IDS.CHART_7, filter: { sortWithLimit: value } });
                        actionDispatch(DashboardActions.getTimeTakenToServicePerCustomer({ chart: CHART_IDS.CHART_7 }));
                      }}
                      dropdownHeight={600}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.chartContainer}>
                  {chart7Type.id === CHART_TYPES.LINE_CHART ? <Line data={chart7Data}
                    options={
                      {
                        ...lineConfig,
                        scales: {
                          yAxes: {
                            title: {
                              display: true,
                              text: I18n.t('seconds')
                            }
                          }
                        }
                      }
                    } /> : chart7Type.id === CHART_TYPES.V_BAR_CHART ? <Bar data={chart7Data} options={
                      {
                        ...barConfig,
                        scales: {
                          ...barConfig.scales,
                          yAxes: {
                            title: {
                              display: true,
                              text: I18n.t('seconds')
                            }
                          }
                        }
                      }
                    } /> : <Bar data={chart7Data} options={
                      {
                        ...stackedConfig,
                        scales: {
                          yAxes: {
                            stacked: true,
                            title: {
                              display: true,
                              text: I18n.t('seconds')
                            }
                          },
                          xAxes: {
                            stacked: true
                          }
                        }
                      }
                    } />}
                </Grid>
              </Grid>
            </CardContent>
          </DashboardCard>
        </Grid>
      </Grid >
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  chartConfig: getConfig,
  chartData: getChartData,
  customerCounts: getCustomerCount,
  serviceCounts: getServiceCount
});

const mapDispatchToProps = dispatch => ({
  loadDashBoard: () => {
    dispatch(DashboardActions.getCustomerCount());
    dispatch(DashboardActions.getServiceCount());
    dispatch(DashboardActions.getTotalAndPlanEnabledCustomers({ chart: CHART_IDS.CHART_1 }));
    dispatch(DashboardActions.getServiceCreatedAndRegistered({ chart: CHART_IDS.CHART_2 }));
    dispatch(DashboardActions.getCustomersRegistered({ chart: CHART_IDS.CHART_3 }));
    // dispatch(DashboardActions.getTotalWastePerCategory({ chart: CHART_IDS.CHART_5 }));
    dispatch(DashboardActions.getTimeTakenToService({ chart: CHART_IDS.CHART_6 }));
    dispatch(DashboardActions.getTimeTakenToServicePerCustomer({ chart: CHART_IDS.CHART_7 }));
  },
  loadOneAPITemplates: () => dispatch(fetchSurveyTemplates()),
  setChartConfig: (data) => dispatch(DashboardActions.changeChartConfiguration(data)),
  setCommonFilter: (data) => dispatch(DashboardActions.changeFilter({ chart: 'common', filter: data })),
  setFilter: (data) => dispatch(DashboardActions.changeFilter(data)),
  resetDashboard: () => dispatch(DashboardActions.resetDashboard())
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'DashboardView'
  // enableReinitialize: true
})(DashboardView));


