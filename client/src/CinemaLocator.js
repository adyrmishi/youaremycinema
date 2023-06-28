function CinemaLocator() {
    return (
        <form>
        <label>
          Postcode
          <input type="text" name="postcode" />
        </label>
        <label>
          Distance
          <input type="text" name="distance" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
}

export default CinemaLocator;