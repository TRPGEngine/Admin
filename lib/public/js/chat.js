layui.use(['layer', 'table'], function() { //独立版的layer无需执行这一句
  // var $ = layui.jquery;
  var layer = layui.layer; //独立版的layer无需执行这一句
  var table = layui.table;
  var reloadTable = function() {
    chatLogTable.reload();
    console.log("table reload");
  }

  $('#sync-log').click(function() {
    $.post('/api/chat/_save', function(data) {
      if(data.result) {
        layer.open({
          type: 1,
          offset: 'auto',
          id: 'syncLogLayer',
          content: '<div style="padding: 20px 100px;">聊天信息同步成功</div>',
          btn: '确定',
          btnAlign: 'c',
          shade: 0,
          yes: function() {
            layer.closeAll();
          }
        });
        reloadTable && reloadTable();
      }else {
        console.error(data);
        layer.msg('同步失败, 请检查后台');
      }
    }).error(function(xhr) {
      console.log('错误信息:', xhr.responseJSON);
      layer.msg('同步失败, 请检查后台');
    })
  })

  var chatLogTable = table.render({
    elem: '#chat-log',
    url:'/api/chat/_log',
    cellMinWidth: 80,
    cols: [[
      {field:'id', title: 'ID', sort: true, width: 80},
      {field:'uuid', title: '信息UUID'},
      {field:'sender_uuid', title: '发送方UUID'},
      {field:'to_uuid', title: '接受方UUID'},
      {field:'room', title: '房间'},
      {field:'message', title: '信息内容', minWidth: 150},
      {field:'type', title: '信息类型', sort: true},
      {field:'data', title: '附带数据', templet: '#tableDataTpl'},
      {field:'is_public', title: '是否公开', sort: true},
      {field:'date', title: '日期', sort: true, templet: '#tableDateTpl'}
    ]],
    page: true,
  });

  $('#chat-table-reload').click(function() {
    layer.msg('刷新完毕');
    reloadTable && reloadTable();
  });
});
