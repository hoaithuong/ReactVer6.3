// (C) 2007-2018 GoodData Corporation
import { fillPoPTitlesAndAliases } from '../popHelper';
import { visualizationObjects } from '../../../__mocks__/fixtures';
import DerivedMeasureTitleSuffixFactory from '../../factory/DerivedMeasureTitleSuffixFactory';
import { VisualizationObject } from '@gooddata/typings';
import IVisualizationObjectContent = VisualizationObject.IVisualizationObjectContent;

function findVisualizationObjectFixture(metaTitle: string): IVisualizationObjectContent {
    const visualizationObject = visualizationObjects.find(chart =>
        chart.visualizationObject.meta.title === metaTitle
    );
    return visualizationObject.visualizationObject.content;
}

describe('popHelper', () => {
    describe('fillPoPTitlesAndAliases', () => {
        it('should set title of derived measures based on master title when master is NOT renamed', () => {
            const suffixFactory = new DerivedMeasureTitleSuffixFactory('en-US');
            suffixFactory.getSuffix = jest.fn(() => ' - testing pop title');

            const visualizationObjectContent = findVisualizationObjectFixture('PoP');
            const result = fillPoPTitlesAndAliases(visualizationObjectContent, suffixFactory);

            expect(result.buckets[0].items).toEqual(
                [
                    {
                        measure: {
                            localIdentifier: 'm1',
                            title: '# Accounts with AD Query',
                            definition: {
                                measureDefinition: {
                                    item: {
                                        uri: '/gdc/md/myproject/obj/8172'
                                    }
                                }
                            }
                        }
                    },
                    {
                        measure: {
                            localIdentifier: 'm1_pop',
                            title: '# Accounts with AD Query - testing pop title',
                            definition: {
                                popMeasureDefinition: {
                                    measureIdentifier: 'm1',
                                    popAttribute: {
                                        uri: '/gdc/md/myproject/obj/1514'
                                    }
                                }
                            }
                        }
                    },
                    {
                        measure: {
                            localIdentifier: 'm1_previous_period',
                            title: '# Accounts with AD Query - testing pop title',
                            definition: {
                                previousPeriodMeasure: {
                                    measureIdentifier: 'm1',
                                    dateDataSets: [{
                                        dataSet: {
                                            uri: '/gdc/md/myproject/obj/921'
                                        },
                                        periodsAgo: 1
                                    }]
                                }
                            }
                        }
                    }
                ]
            );
        });

        it('should set title of derived measures based on master alias when master is renamed', () => {
            const suffixFactory = new DerivedMeasureTitleSuffixFactory('en-US');
            suffixFactory.getSuffix = jest.fn(() => ' - testing pop title');

            const visualizationObjectContent = findVisualizationObjectFixture('PoP alias test');
            const result = fillPoPTitlesAndAliases(visualizationObjectContent, suffixFactory);

            expect(result.buckets[0].items).toEqual(
                [
                    {
                        measure: {
                            localIdentifier: 'm1',
                            title: '# Accounts with AD Query',
                            alias: 'AD Queries',
                            definition: {
                                measureDefinition: {
                                    item: {
                                        uri: '/gdc/md/myproject/obj/8172'
                                    }
                                }
                            }
                        }
                    },
                    {
                        measure: {
                            localIdentifier: 'm1_pop',
                            title: 'AD Queries - testing pop title',
                            definition: {
                                popMeasureDefinition: {
                                    measureIdentifier: 'm1',
                                    popAttribute: {
                                        uri: '/gdc/md/myproject/obj/1514'
                                    }
                                }
                            }
                        }
                    },
                    {
                        measure: {
                            localIdentifier: 'm1_previous_period',
                            title: 'AD Queries - testing pop title',
                            definition: {
                                previousPeriodMeasure: {
                                    measureIdentifier: 'm1',
                                    dateDataSets: [{
                                        dataSet: {
                                            uri: '/gdc/md/myproject/obj/921'
                                        },
                                        periodsAgo: 1
                                    }]
                                }
                            }
                        }
                    }
                ]
            );
        });

        it('should set title of derived based on master title even when it is located in a different bucket', () => {
            const suffixFactory = new DerivedMeasureTitleSuffixFactory('en-US');
            suffixFactory.getSuffix = jest.fn(() => ' - testing pop title');

            const visualizationObjectContent = findVisualizationObjectFixture('pop headline test');
            const result = fillPoPTitlesAndAliases(visualizationObjectContent, suffixFactory);

            expect(result.buckets[0].items).toEqual(
                [
                    {
                        measure: {
                            localIdentifier: 'fdd41e4ca6224cd2b5ecce15fdabf062',
                            title: 'Sum of Email Clicks',
                            format: '#,##0.00',
                            definition: {
                                measureDefinition: {
                                    aggregation: 'sum',
                                    item: {
                                        uri: '/gdc/md/yrungi0zwpoud7h1kmh6ldhp0vgkpi41/obj/15428'
                                    }
                                }
                            }
                        }
                    }
                ]
            );

            expect(result.buckets[1].items).toEqual(
                [
                    {
                        measure: {
                            localIdentifier: 'fdd41e4ca6224cd2b5ecce15fdabf062_pop',
                            title: 'Sum of Email Clicks - testing pop title',
                            definition: {
                                popMeasureDefinition: {
                                    measureIdentifier: 'fdd41e4ca6224cd2b5ecce15fdabf062',
                                    popAttribute: {
                                        uri: '/gdc/md/yrungi0zwpoud7h1kmh6ldhp0vgkpi41/obj/15330'
                                    }
                                }
                            }
                        }
                    },
                    {
                        measure: {
                            localIdentifier: 'fdd41e4ca6224cd2b5ecce15fdabf062_previous_period',
                            title: 'Sum of Email Clicks - testing pop title',
                            definition: {
                                previousPeriodMeasure: {
                                    measureIdentifier: 'fdd41e4ca6224cd2b5ecce15fdabf062',
                                    dateDataSets: [{
                                        dataSet: {
                                            uri: '/gdc/md/yrungi0zwpoud7h1kmh6ldhp0vgkpi41/obj/921'
                                        },
                                        periodsAgo: 1
                                    }]
                                }
                            }
                        }
                    }
                ]
            );
        });
    });
});
