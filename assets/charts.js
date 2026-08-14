(function() {
  var style = getComputedStyle(document.documentElement);
  var primary = style.getPropertyValue('--primary').trim() || '#0d9488';
  var primaryDark = style.getPropertyValue('--primary-dark').trim() || '#0f766e';
  var accent2 = style.getPropertyValue('--accent-2').trim() || '#f59e0b';
  var ink = style.getPropertyValue('--text-main').trim() || '#1e293b';
  var muted = style.getPropertyValue('--text-muted').trim() || '#64748b';
  var rule = style.getPropertyValue('--border').trim() || '#e2e8f0';
  var bg2 = style.getPropertyValue('--bg-secondary').trim() || '#ffffff';
  var success = '#22c55e';
  var info = '#3b82f6';
  var danger = '#ef4444';
  var purple = '#8b5cf6';
  var cyan = '#0891b2';

  function initChart(id, option) {
    var el = document.getElementById(id);
    if (!el || typeof echarts === 'undefined') return null;
    var chart = echarts.init(el, null, { renderer: 'svg' });
    chart.setOption(option);
    window.addEventListener('resize', function() { chart.resize(); });
    return chart;
  }

  // Sales Trend Chart
  initChart('chart-sales-trend', {
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true },
    grid: { left: 40, right: 16, top: 20, bottom: 28 },
    xAxis: {
      type: 'category',
      data: ['8/8', '8/9', '8/10', '8/11', '8/12', '8/13', '8/14'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 11 }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      axisLabel: { color: muted, fontSize: 11 }
    },
    series: [{
      type: 'line',
      data: [85, 102, 95, 110, 125, 118, 128],
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: { color: primary, width: 2 },
      itemStyle: { color: primary },
      areaStyle: {
        color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{ offset: 0, color: primary + '33' }, { offset: 1, color: primary + '05' }]
        }
      }
    }]
  });

  // Inventory Distribution Pie Chart
  initChart('chart-inv-dist', {
    animation: false,
    tooltip: { trigger: 'item', appendToBody: true },
    legend: { bottom: 0, itemWidth: 10, itemHeight: 10, textStyle: { color: muted, fontSize: 11 } },
    series: [{
      type: 'pie',
      radius: ['38%', '62%'],
      center: ['50%', '42%'],
      label: { show: false },
      data: [
        { value: 64, name: '门店可用', itemStyle: { color: success } },
        { value: 20, name: '销售预占', itemStyle: { color: info } },
        { value: 175, name: '采购在途', itemStyle: { color: purple } },
        { value: 5, name: '调拨在途', itemStyle: { color: cyan } },
        { value: 10, name: '异常冻结', itemStyle: { color: accent2 } },
        { value: 4, name: '残次品', itemStyle: { color: danger } }
      ]
    }]
  });

  // Order Status by Store (Stacked Bar)
  initChart('chart-order-status', {
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, axisPointer: { type: 'shadow' } },
    legend: { bottom: 0, itemWidth: 10, itemHeight: 10, textStyle: { color: muted, fontSize: 11 } },
    grid: { left: 50, right: 16, top: 20, bottom: 40 },
    xAxis: {
      type: 'category',
      data: ['北京朝阳店', '北京海淀店', '上海浦东店'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 11 }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      axisLabel: { color: muted, fontSize: 11 }
    },
    series: [
      { name: '待自提', type: 'bar', stack: 'total', data: [15, 20, 21], itemStyle: { color: success }, barWidth: 28 },
      { name: '备货中', type: 'bar', stack: 'total', data: [12, 8, 10], itemStyle: { color: info } },
      { name: '已完成', type: 'bar', stack: 'total', data: [45, 38, 42], itemStyle: { color: primary } },
      { name: '退款中', type: 'bar', stack: 'total', data: [3, 1, 1], itemStyle: { color: accent2 } }
    ]
  });
})();
