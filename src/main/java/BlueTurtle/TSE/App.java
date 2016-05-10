package BlueTurtle.TSE;

import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Scanner;
import java.util.Set;

import BlueTurtle.finders.PackageNameFinder;
import BlueTurtle.groupers.WarningGrouper;
import BlueTurtle.parsers.CheckStyleXMLParser;
import BlueTurtle.parsers.FindBugsXMLParser;
import BlueTurtle.parsers.PMDXMLParser;
import BlueTurtle.parsers.XMLParser;
import BlueTurtle.summarizers.Summarizer;
import BlueTurtle.warnings.Warning;
import BlueTurtle.writers.JsonWriter;

/**
 * This class is the main driver of the whole system.
 * 
 * @author BlueTurtle.
 *
 */
public class App {

	/**
	 * Main method. This is currently filled with code that used for testing
	 * purposes!
	 * 
	 * @param args
	 *            arugments.
	 * @throws IOException
	 *             throws an exception if there was a problem reading a file.
	 */
	public static void main(String[] args) throws IOException {

		// jsonTest();
		Scanner sc = new Scanner(System.in);
		System.out.println("Which ASAT do you wish to run? (CheckStyle, PMD, FindBugs)");
		String asat = sc.next();
		switch (asat) {
		case "CheckStyle":
			XMLParser parser1 = new CheckStyleXMLParser();
			List<Warning> checkStyleWarnings = parser1.parseFile("./src/main/resources/exampleCheckstyle1.xml");

			System.out.println("amount of CheckStyle Warnings:" + " " + checkStyleWarnings.size());

			for (Warning w : checkStyleWarnings) {
				System.out.println("Violated Rule Name: " + w.getRuleName());
			}
			break;
		case "PMD":
			XMLParser parser2 = new PMDXMLParser();
			List<Warning> pmdWarnings = parser2.parseFile("./src/main/resources/examplePmd2.xml");

			System.out.println("amount of PMD Warnings:" + " " + pmdWarnings.size());

			for (Warning w : pmdWarnings) {
				System.out.println("Violated Rule Name: " + w.getRuleName());
			}
			break;
		case "FindBugs":
			XMLParser parser3 = new FindBugsXMLParser();
			List<Warning> findBugsWarnings = parser3.parseFile("./src/main/resources/exampleFindbugs1.xml");

			System.out.println("amount of FindBugs Warnings:" + " " + findBugsWarnings.size());

			for (Warning w : findBugsWarnings) {
				System.out.println("Violated Rule Name: " + w.getRuleName());
				System.out.println("file path: " + w.getFilePath());
			}
			break;
		default:
			System.out.println("Please enter a valid name for ASAT");
		}

	}

	/**
	 * This method is for testing purposes only!!! It only works with my pc,
	 * because of the path in the example file.
	 * 
	 * @throws IOException
	 *             throws an exception if something wrong has happened in the
	 *             the process of writing or reading a file.
	 */
	public static void jsonTest() throws IOException {
		XMLParser parser = new CheckStyleXMLParser();
		List<Warning> checkStyleWarnings = parser.parseFile("./src/main/resources/exampleCheckstyle1.xml");

		System.out.println("amount of CheckStyle Warnings:" + " " + checkStyleWarnings.size());

		for (Warning w : checkStyleWarnings) {
			System.out.println("Violated Rule Name: " + w.getRuleName());
		}

		HashMap<String, String> componentsInfo = new HashMap<String, String>();
		Set<String> packagesNames = new HashSet<String>();

		for (Warning w : checkStyleWarnings) {
			componentsInfo.put(w.getFileName(), w.getFilePath());
			packagesNames.add(PackageNameFinder.findPackageName(w.getFilePath()));
		}

		WarningGrouper wg = new WarningGrouper(componentsInfo, packagesNames, checkStyleWarnings);
		List<Summarizer> list = wg.groupBy("packages");

		JsonWriter jwriter = new JsonWriter(list);
		jwriter.writeToJsonFormat("./src/main/resources/SummarizedOuput.json");
		System.out.println("Done");
	}
}
