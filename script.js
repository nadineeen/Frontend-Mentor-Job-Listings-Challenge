'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function getFilterOptions(_ref) {
  var id = _ref.id,
      company = _ref.company,
      logo = _ref.logo,
      featured = _ref.featured,
      position = _ref.position,
      postedAt = _ref.postedAt,
      contract = _ref.contract,
      location = _ref.location,
      rest = _objectWithoutProperties(_ref, ['id', 'company', 'logo', 'featured', 'position', 'postedAt', 'contract', 'location']);

  delete rest['new'];
  return Object.values(rest).reduce(function (acc, current) {
    return Array.isArray(current) ? [].concat(_toConsumableArray(acc), _toConsumableArray(current)) : [].concat(_toConsumableArray(acc), [current]);
  }, []);
}

function Listing(props) {
  var onFilterClick = props.onFilterClick,
      id = props.id,
      company = props.company,
      logo = props.logo,
      featured = props.featured,
      position = props.position,
      postedAt = props.postedAt,
      contract = props.contract,
      location = props.location,
      rest = _objectWithoutProperties(props, ['onFilterClick', 'id', 'company', 'logo', 'featured', 'position', 'postedAt', 'contract', 'location']);

  var _new = rest.new;

  var filterTags = getFilterOptions(Object.assign({}, rest));

  return React.createElement(
    'div',
    {
      className: 'card row justify-space-between no-wrap-desktop mb-5' + ('' + (featured ? ' accent-border' : '')),
      'data-id': id
    },
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement('img', { src: logo, alt: company + ' Logo', className: 'logo mr-4' }),
      React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'row mb-2 mt-2' },
          React.createElement(
            'p',
            { className: 'primary mr-2 mb-0 mt-0' },
            React.createElement(
              'strong',
              null,
              company
            )
          ),
          _new && React.createElement(
            'div',
            { className: 'badge mr-1' },
            'new!'
          ),
          featured && React.createElement(
            'div',
            { className: 'badge secondary' },
            'featured'
          )
        ),
        React.createElement(
          'div',
          { className: 'mb-2 mt-2' },
          React.createElement(
            'a',
            { className: 'link' },
            React.createElement(
              'strong',
              null,
              position
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'row sub-text' },
          React.createElement(
            'span',
            null,
            postedAt
          ),
          React.createElement(
            'span',
            { className: 'inline-divider' },
            '\u2022'
          ),
          React.createElement(
            'span',
            null,
            contract
          ),
          React.createElement(
            'span',
            { className: 'inline-divider' },
            '\u2022'
          ),
          React.createElement(
            'span',
            null,
            location
          )
        )
      )
    ),
    React.createElement('div', { className: 'divider mb-0 mobile-only' }),
    React.createElement(
      'div',
      { className: 'row' },
      filterTags.map(function (tag, i) {
        return React.createElement(
          'div',
          {
            key: i,
            className: 'filter-tablet actionable mt-2' + ('' + (i < filterTags.length - 1 ? ' mr-2' : '')),
            onClick: function onClick() {
              return onFilterClick(tag);
            }
          },
          tag
        );
      })
    )
  );
}

function FilterList(_ref2) {
  var filters = _ref2.filters,
      handleRemoveFilter = _ref2.handleRemoveFilter,
      handleRemoveAll = _ref2.handleRemoveAll;

  return React.createElement(
    'div',
    { className: 'filter-list-container' },
    React.createElement(
      'div',
      { className: 'row card justify-space-between no-wrap' },
      React.createElement(
        'div',
        { className: 'row' },
        filters.map(function (f, i) {
          return React.createElement(
            'div',
            {
              key: f,
              className: 'row filter-remove' + ('' + (i < filters.length - 1 ? ' mr-2' : ''))
            },
            React.createElement(
              'div',
              { className: 'filter-tablet' },
              f
            ),
            React.createElement('img', {
              src: './images/icon-remove.svg',
              className: 'button actionable',
              onClick: function onClick() {
                return handleRemoveFilter(f);
              }
            })
          );
        })
      ),
      React.createElement(
        'div',
        { className: 'primary actionable', onClick: handleRemoveAll },
        'Clear'
      )
    )
  );
}

function JobListings(_ref3) {
  var data = _ref3.data;

  var _React$useState = React.useState({}),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      filters = _React$useState2[0],
      setFilters = _React$useState2[1];

  var _React$useState3 = React.useState(data),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      listData = _React$useState4[0],
      setListData = _React$useState4[1];

  var handleFilterClick = function handleFilterClick(tag) {
    if (filters[tag]) {
      return;
    } else {
      filters[tag] = true;
      setFilters(Object.assign({}, filters));
    }
  };

  var handleRemoveFilter = function handleRemoveFilter(tag) {
    delete filters[tag];
    setFilters(Object.assign({}, filters));
  };

  var handleRemoveAll = function handleRemoveAll() {
    setFilters({});
  };

  React.useEffect(function () {
    if (filters.length === 0) return;

    var list = data.filter(function (d) {
      var filterTags = getFilterOptions(d);
      return Object.keys(filters).every(function (f) {
        return filterTags.indexOf(f) !== -1;
      });
    });
    setListData(list);
  }, [filters]);

  React.useEffect(function () {
    setListData(data);
  }, [data]);

  return React.createElement(
    React.Fragment,
    null,
    Object.keys(filters).length > 0 && React.createElement(FilterList, {
      filters: Object.keys(filters),
      handleRemoveFilter: handleRemoveFilter,
      handleRemoveAll: handleRemoveAll
    }),
    listData.map(function (d) {
      return React.createElement(Listing, Object.assign({}, d, { key: d.id, onFilterClick: handleFilterClick }));
    })
  );
}

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.responseText);
    ReactDOM.render(React.createElement(JobListings, { data: data }), document.querySelector('#root'));
  }
};
xmlhttp.open('GET', 'data.json', true);
xmlhttp.send();