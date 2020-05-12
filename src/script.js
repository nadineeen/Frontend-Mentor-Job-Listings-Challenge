'use strict';

function getFilterOptions({
  id,
  company,
  logo,
  featured,
  position,
  postedAt,
  contract,
  location,
  ...rest
}) {
  delete rest['new'];
  return Object.values(rest).reduce(
    (acc, current) =>
      Array.isArray(current) ? [...acc, ...current] : [...acc, current],
    []
  );
}

function Listing(props) {
  const {
    onFilterClick,
    id,
    company,
    logo,
    featured,
    position,
    postedAt,
    contract,
    location,
    ...rest
  } = props;
  const _new = rest.new;

  const filterTags = getFilterOptions({ ...rest });

  return (
    <div
      className={
        'card row justify-space-between no-wrap-desktop mb-5' +
        `${featured ? ' accent-border' : ''}`
      }
      data-id={id}
    >
      <div className="row">
        <img src={logo} alt={`${company} Logo`} className="logo mr-4" />
        <div>
          {/* Company & Position */}
          <div className="row mb-2 mt-2">
            <p className="primary mr-2 mb-0 mt-0">
              <strong>{company}</strong>
            </p>
            {_new && <div className="badge mr-1">new!</div>}
            {featured && <div className="badge secondary">featured</div>}
          </div>
          <div className="mb-2 mt-2">
            <a className="link">
              <strong>{position}</strong>
            </a>
          </div>

          {/* Info about listing */}
          <div className="row sub-text">
            <span>{postedAt}</span>
            <span className="inline-divider">•</span>
            <span>{contract}</span>
            <span className="inline-divider">•</span>
            <span>{location}</span>
          </div>
        </div>
      </div>

      <div className="divider mb-0 mobile-only"></div>

      {/* Filter Tags */}
      <div className="row">
        {filterTags.map((tag, i) => (
          <div
            key={i}
            className={
              'filter-tablet actionable mt-2' +
              `${i < filterTags.length - 1 ? ' mr-2' : ''}`
            }
            onClick={() => onFilterClick(tag)}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}

function FilterList({ filters, handleRemoveFilter, handleRemoveAll }) {
  return (
    <div className="filter-list-container">
      <div className="row card justify-space-between no-wrap">
        <div className="row">
          {filters.map((f, i) => (
            <div
              key={f}
              className={
                'row filter-remove' + `${i < filters.length - 1 ? ' mr-2' : ''}`
              }
            >
              <div className="filter-tablet">{f}</div>
              <img
                src="./images/icon-remove.svg"
                className="button actionable"
                onClick={() => handleRemoveFilter(f)}
              ></img>
            </div>
          ))}
        </div>
        <div className="primary actionable" onClick={handleRemoveAll}>
          Clear
        </div>
      </div>
    </div>
  );
}

function JobListings({ data }) {
  const [filters, setFilters] = React.useState({});

  const [listData, setListData] = React.useState(data);

  const handleFilterClick = (tag) => {
    if (filters[tag]) {
      return;
    } else {
      filters[tag] = true;
      setFilters({ ...filters });
    }
  };

  const handleRemoveFilter = (tag) => {
    delete filters[tag];
    setFilters({ ...filters });
  };

  const handleRemoveAll = () => {
    setFilters({});
  };

  React.useEffect(() => {
    if (filters.length === 0) return;

    const list = data.filter((d) => {
      const filterTags = getFilterOptions(d);
      return Object.keys(filters).every((f) => filterTags.indexOf(f) !== -1);
    });
    setListData(list);
  }, [filters]);

  React.useEffect(() => {
    setListData(data);
  }, [data]);

  return (
    <React.Fragment>
      {Object.keys(filters).length > 0 && (
        <FilterList
          filters={Object.keys(filters)}
          handleRemoveFilter={handleRemoveFilter}
          handleRemoveAll={handleRemoveAll}
        />
      )}

      {listData.map((d) => (
        <Listing {...d} key={d.id} onFilterClick={handleFilterClick} />
      ))}
    </React.Fragment>
  );
}

const xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    const data = JSON.parse(this.responseText);
    ReactDOM.render(
      React.createElement(JobListings, { data }),
      document.querySelector('#root')
    );
  }
};
xmlhttp.open('GET', 'data.json', true);
xmlhttp.send();
